import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { IngestIfoodOrderUseCase } from '@application/ifood/use-cases/ingest-ifood-order.usecase';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { getIfoodConfig } from '@infrastructure/ifood/ifood-config';
import { RealtimeGateway } from '@interfaces/websocket/realtime.gateway';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('integrations/ifood')
export class IfoodController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ingest: IngestIfoodOrderUseCase,
    private readonly realtime: RealtimeGateway,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePanelPermission(PANEL_PERMISSION_CODES.SETTINGS)
  async getSettings(@CompanyUuid() companyUuid: string) {
    const client = this.prisma.client as any;
    const row = await client.ifoodIntegration.findUnique({
      where: { companyUuid },
    });
    if (!row) {
      return {
        enabled: false,
        merchantId: null,
        clientId: null,
        hasClientSecret: false,
        hasWebhookSecret: false,
        configured: false,
      };
    }
    return {
      enabled: Boolean(row.enabled),
      merchantId: row.merchantId ?? null,
      clientId: row.clientId ?? null,
      hasClientSecret: Boolean(row.clientSecret),
      hasWebhookSecret: Boolean(row.webhookSecret),
      configured: true,
    };
  }

  @Put()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePanelPermission(PANEL_PERMISSION_CODES.SETTINGS)
  async upsertSettings(
    @CompanyUuid() companyUuid: string,
    @Body()
    body: {
      enabled?: boolean;
      merchantId?: string | null;
      clientId?: string | null;
      clientSecret?: string | null;
      webhookSecret?: string | null;
    },
  ) {
    const client = this.prisma.client as any;
    const existing = await client.ifoodIntegration.findUnique({
      where: { companyUuid },
    });

    const data: Record<string, unknown> = {};
    if (body.enabled !== undefined) data.enabled = Boolean(body.enabled);
    if (body.merchantId !== undefined) {
      data.merchantId = body.merchantId?.trim() ? body.merchantId.trim() : null;
    }
    if (body.clientId !== undefined) {
      data.clientId = body.clientId?.trim() ? body.clientId.trim() : null;
    }
    if (body.clientSecret !== undefined) {
      // string vazia = não altera; null explícito limpa
      if (body.clientSecret === null) data.clientSecret = null;
      else if (typeof body.clientSecret === 'string' && body.clientSecret.trim()) {
        data.clientSecret = body.clientSecret.trim();
      }
    }
    if (body.webhookSecret !== undefined) {
      if (body.webhookSecret === null) data.webhookSecret = null;
      else if (typeof body.webhookSecret === 'string' && body.webhookSecret.trim()) {
        data.webhookSecret = body.webhookSecret.trim();
      }
    }

    if (existing) {
      await client.ifoodIntegration.update({
        where: { companyUuid },
        data,
      });
    } else {
      await client.ifoodIntegration.create({
        data: {
          uuid: crypto.randomUUID(),
          companyUuid,
          enabled: Boolean(body.enabled),
          merchantId: body.merchantId?.trim() || null,
          clientId: body.clientId?.trim() || null,
          clientSecret: body.clientSecret?.trim() || null,
          webhookSecret: body.webhookSecret?.trim() || null,
        },
      });
    }

    return this.getSettings(companyUuid);
  }

  @Post('simulate')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePanelPermission(PANEL_PERMISSION_CODES.SETTINGS)
  async simulate(
    @CompanyUuid() companyUuid: string,
    @Body()
    body: {
      externalId?: string;
      items?: {
        externalCode: string;
        quantity: number;
        unitPrice?: number;
        addonsSnapshot?: { name: string; extraPrice: number }[];
      }[];
      observacao?: string | null;
    },
  ) {
    const externalId = body.externalId?.trim() || `sim-${crypto.randomUUID()}`;
    const order = await this.ingest.simulate({
      companyUuid,
      externalId,
      items: body.items ?? [],
      observacao: body.observacao,
      skipConfirm: true,
    });
    this.realtime.emitOrdersUpdate(companyUuid);
    return order;
  }

  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Headers('x-ifood-signature') signature: string | undefined,
    @Headers('authorization') authorization: string | undefined,
    @Body()
    body: {
      code?: string;
      fullCode?: string;
      orderId?: string;
      merchantId?: string;
      id?: string;
      metadata?: { orderId?: string; merchantId?: string };
    },
  ) {
    this.assertWebhookSecret(signature, authorization);

    const fullCode = (body.fullCode || body.code || '').toUpperCase();
    const isPlaced =
      fullCode === 'PLC' ||
      fullCode === 'PLACED' ||
      fullCode === 'ORDER_PLACED' ||
      fullCode.includes('PLACED');

    if (!isPlaced) {
      return { ok: true, ignored: true, reason: 'event_not_handled' };
    }

    const orderId = body.orderId || body.metadata?.orderId || body.id;
    const merchantId = body.merchantId || body.metadata?.merchantId;
    if (!orderId || !merchantId) {
      throw new BadRequestException('orderId e merchantId são obrigatórios');
    }

    const order = await this.ingest.ingestFromWebhook(merchantId, orderId);
    const companyUuid = await this.resolveCompanyByMerchant(merchantId);
    if (companyUuid) this.realtime.emitOrdersUpdate(companyUuid);
    return { ok: true, orderUuid: order.uuid };
  }

  private async resolveCompanyByMerchant(merchantId: string): Promise<string | null> {
    const client = this.prisma.client as any;
    const row = await client.ifoodIntegration.findFirst({
      where: { merchantId },
      select: { companyUuid: true },
    });
    return row?.companyUuid ?? null;
  }

  private assertWebhookSecret(
    signature: string | undefined,
    authorization: string | undefined,
  ) {
    const cfg = getIfoodConfig();
    const provided =
      (signature || '').trim() ||
      (authorization?.startsWith('Bearer ') ? authorization.slice(7).trim() : '');

    // Sem secret em env: aceita (dev). Com secret: exige match no header.
    if (!cfg.webhookSecret) return;
    if (!provided || provided !== cfg.webhookSecret) {
      throw new UnauthorizedException('Webhook secret inválido');
    }
  }
}
