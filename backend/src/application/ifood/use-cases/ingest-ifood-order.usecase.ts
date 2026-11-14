import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.usecase';
import type { OrderListDto, OrderRepository } from '@domain/order/repositories/order.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { IfoodApiClient, type IfoodOrderDetails } from '@infrastructure/ifood/ifood-api.client';
import { IfoodAuthService } from '@infrastructure/ifood/ifood-auth.service';
import { IFOOD_SYNTHETIC_TABLE_NUMBER } from '@infrastructure/ifood/ifood-config';

export type SimulateIfoodItemInput = {
  externalCode: string;
  quantity: number;
  unitPrice?: number;
  addonsSnapshot?: { name: string; extraPrice: number }[];
};

export type SimulateIfoodOrderInput = {
  companyUuid: string;
  externalId: string;
  items: SimulateIfoodItemInput[];
  observacao?: string | null;
  /** Se true, não chama confirm na API iFood (padrão em simulate). */
  skipConfirm?: boolean;
};

export class IngestIfoodOrderUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderRepository: OrderRepository,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly ifoodApi: IfoodApiClient,
    private readonly ifoodAuth: IfoodAuthService,
  ) {}

  async ingestFromWebhook(merchantId: string, orderId: string): Promise<OrderListDto> {
    const client = this.prisma.client as any;
    const integration = await client.ifoodIntegration.findFirst({
      where: { merchantId, enabled: true },
    });
    if (!integration) {
      throw new NotFoundException('Merchant iFood não encontrado ou integração desabilitada');
    }

    const existing = await this.orderRepository.findByExternalId(
      'IFOOD',
      orderId,
      integration.companyUuid,
    );
    if (existing) return existing;

    const accessToken = await this.ifoodAuth.getAccessToken(integration.companyUuid);
    const details = await this.ifoodApi.getOrder(orderId, accessToken);
    const order = await this.createFromDetails(integration.companyUuid, details, false);
    try {
      await this.ifoodApi.confirmOrder(orderId, accessToken);
    } catch (err) {
      // Pedido já criado localmente; confirmação pode ser retentada depois.
      console.error('confirm iFood failed after ingest', err);
    }
    return order;
  }

  async simulate(input: SimulateIfoodOrderInput): Promise<OrderListDto> {
    const externalId = input.externalId?.trim();
    if (!externalId) throw new BadRequestException('externalId é obrigatório');
    if (!input.items?.length) throw new BadRequestException('items é obrigatório');

    const existing = await this.orderRepository.findByExternalId(
      'IFOOD',
      externalId,
      input.companyUuid,
    );
    if (existing) return existing;

    const details: IfoodOrderDetails = {
      id: externalId,
      items: input.items.map((it) => ({
        externalCode: it.externalCode,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        options: it.addonsSnapshot?.map((a) => ({
          name: a.name,
          price: a.extraPrice,
        })),
      })),
      observations: input.observacao ?? undefined,
    };

    return this.createFromDetails(input.companyUuid, details, input.skipConfirm !== false);
  }

  private async createFromDetails(
    companyUuid: string,
    details: IfoodOrderDetails,
    _skipConfirm: boolean,
  ): Promise<OrderListDto> {
    if (!details.id) throw new BadRequestException('Pedido iFood sem id');
    if (!details.items?.length) throw new BadRequestException('Pedido iFood sem itens');

    const tableUuid = await this.ensureIfoodTable(companyUuid);
    const mappedItems = await this.mapItems(companyUuid, details);

    try {
      const created = await this.createOrderUseCase.execute({
        companyUuid,
        tableUuid,
        items: mappedItems,
        observacao: details.observations ?? details.extraInfo ?? null,
        source: 'IFOOD',
        externalId: details.id,
        status: 'PENDING',
      });
      const full = await this.orderRepository.findById(created.uuid, companyUuid);
      if (!full) throw new Error('Pedido criado mas não encontrado');
      return full;
    } catch (err: any) {
      // Race: outro request criou o mesmo externalId
      if (String(err?.message || err).includes('Unique constraint') || err?.code === 'P2002') {
        const existing = await this.orderRepository.findByExternalId(
          'IFOOD',
          details.id,
          companyUuid,
        );
        if (existing) return existing;
        throw new ConflictException('Pedido iFood já existe');
      }
      throw err;
    }
  }

  private async ensureIfoodTable(companyUuid: string): Promise<string> {
    const client = this.prisma.client as any;
    const existing = await client.table.findFirst({
      where: { companyUuid, number: IFOOD_SYNTHETIC_TABLE_NUMBER },
    });
    if (existing) return existing.uuid as string;

    const created = await client.table.create({
      data: {
        uuid: crypto.randomUUID(),
        number: IFOOD_SYNTHETIC_TABLE_NUMBER,
        description: 'iFood',
        qrCode: '',
        companyUuid,
      },
    });
    return created.uuid as string;
  }

  private async mapItems(
    companyUuid: string,
    details: IfoodOrderDetails,
  ): Promise<
    {
      productUuid: string;
      quantity: number;
      unitPrice: number;
      addonsSnapshot?: { name: string; extraPrice: number }[];
    }[]
  > {
    const client = this.prisma.client as any;
    const missing: string[] = [];
    const mapped: {
      productUuid: string;
      quantity: number;
      unitPrice: number;
      addonsSnapshot?: { name: string; extraPrice: number }[];
    }[] = [];

    for (const item of details.items) {
      const code = (item.externalCode || '').trim();
      if (!code) {
        missing.push(item.name || '(sem código)');
        continue;
      }
      const product = await client.product.findFirst({
        where: { companyUuid, ifoodExternalCode: code, active: true },
      });
      if (!product) {
        missing.push(code);
        continue;
      }
      const unitPrice =
        typeof item.unitPrice === 'number' && !Number.isNaN(item.unitPrice)
          ? item.unitPrice
          : Number(product.price) || 0;
      const addonsSnapshot =
        item.options
          ?.filter((o) => o?.name)
          .map((o) => ({
            name: String(o.name).slice(0, 120),
            extraPrice: Math.max(0, Number(o.price) || 0),
          })) ?? undefined;
      mapped.push({
        productUuid: product.uuid,
        quantity: Math.max(1, Number(item.quantity) || 1),
        unitPrice,
        addonsSnapshot: addonsSnapshot?.length ? addonsSnapshot : undefined,
      });
    }

    if (missing.length) {
      throw new BadRequestException(
        `Produtos sem mapeamento iFood (ifoodExternalCode): ${missing.join(', ')}`,
      );
    }
    return mapped;
  }
}
