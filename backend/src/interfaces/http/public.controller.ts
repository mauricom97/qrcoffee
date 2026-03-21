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
      include: { company: { select: { menuTheme: true } } },
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

    const products = await this.prisma.client.product.findMany({
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
    };
  }

  @Post('orders')
  async createOrder(
    @Body()
    body: {
      tableUuid: string;
      items: { productUuid: string; quantity: number; unitPrice: number }[];
    },
  ) {
    const { tableUuid, items } = body;
    if (!tableUuid || !items?.length) {
      throw new BadRequestException('Informe a mesa e os itens do pedido.');
    }

    const table = await this.prisma.client.table.findUnique({
      where: { uuid: tableUuid },
    });
    if (!table) throw new NotFoundException('Mesa não encontrada');

    const order = await this.createOrderUseCase.execute({
      tableUuid,
      items,
      companyUuid: table.companyUuid,
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
