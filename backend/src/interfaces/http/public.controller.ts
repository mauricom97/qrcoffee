import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.usecase';
import { RealtimeGateway } from '@interfaces/websocket/realtime.gateway';
import {
  isKitchenOpenNow,
  kitchenHoursDefinesSchedule,
} from '@domain/company/kitchen-hours';

@Controller('public')
export class PublicController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly realtime: RealtimeGateway,
  ) {}

  @Get('table/:tableUuid')
  async getTable(@Param('tableUuid') tableUuid: string) {
    const table = await this.prisma.client.table.findUnique({
      where: { uuid: tableUuid },
    });
    if (!table) throw new NotFoundException('Mesa não encontrada');
    return {
      uuid: table.uuid,
      number: table.number,
      description: table.description,
    };
  }

  @Get('menu/:tableUuid')
  async getMenu(@Param('tableUuid') tableUuid: string) {
    const table = await this.prisma.client.table.findUnique({
      where: { uuid: tableUuid },
      include: { company: { select: { menuTheme: true, kitchenHours: true } } },
    });
    if (!table) throw new NotFoundException('Mesa não encontrada');

    let theme = null;
    if (table.company.menuTheme) {
      try {
        theme = JSON.parse(table.company.menuTheme);
      } catch {
        theme = null;
      }
    }

    const kitchenHoursConfigured = kitchenHoursDefinesSchedule(
      table.company.kitchenHours,
    );
    const kitchenOpen = isKitchenOpenNow(table.company.kitchenHours);

    const productsRaw = await this.prisma.client.product.findMany({
      where: {
        companyUuid: table.companyUuid,
        active: true,
      },
      include: {
        category: {
          select: {
            uuid: true,
            name: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    const products = productsRaw.filter(
      (p) => p.isKitchenProduct !== true || kitchenOpen,
    );

    const categories = await this.prisma.client.category.findMany({
      where: { companyUuid: table.companyUuid },
      orderBy: { name: 'asc' },
    });

    const grouped = categories.map((cat) => ({
      ...cat,
      products: products.filter((p) => p.categoryUuid === cat.uuid),
    }));

    return {
      table: {
        uuid: table.uuid,
        number: table.number,
        description: table.description,
        companyUuid: table.companyUuid,
      },
      categories: grouped.filter((g) => g.products.length > 0),
      theme,
      kitchenHoursConfigured,
      kitchenOpen,
    };
  }

  @Post('orders')
  async createOrder(
    @Body()
    body: {
      tableUuid: string;
      items: { productUuid: string; quantity: number; unitPrice: number }[];
      observacao?: string | null;
    },
  ) {
    const { tableUuid, items, observacao } = body;
    if (!tableUuid || !items?.length) {
      throw new BadRequestException('Informe a mesa e os itens do pedido.');
    }

    const table = await this.prisma.client.table.findUnique({
      where: { uuid: tableUuid },
      include: { company: { select: { kitchenHours: true } } },
    });
    if (!table) throw new NotFoundException('Mesa não encontrada');

    const productUuids = [...new Set(items.map((i) => i.productUuid))];
    const products = await this.prisma.client.product.findMany({
      where: {
        uuid: { in: productUuids },
        companyUuid: table.companyUuid,
      },
    });
    if (products.length !== productUuids.length) {
      throw new BadRequestException('Um ou mais produtos são inválidos.');
    }

    const kitchenOpen = isKitchenOpenNow(table.company.kitchenHours);
    for (const p of products) {
      if (p.isKitchenProduct === true && !kitchenOpen) {
        throw new BadRequestException(
          'A cozinha está fechada; não é possível pedir estes itens agora.',
        );
      }
    }

    const order = await this.createOrderUseCase.execute({
      tableUuid,
      items,
      companyUuid: table.companyUuid,
      observacao,
    });

    this.realtime.emitOrdersUpdate(table.companyUuid);

    const full = await this.prisma.client.order.findUnique({
      where: { uuid: order.uuid },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return full;
  }
}
