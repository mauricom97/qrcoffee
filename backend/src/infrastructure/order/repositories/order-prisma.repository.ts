import { Order } from '@domain/order/entities/order.entity';
import { OrderItem } from '@domain/order/entities/order-item.entity';
import { OrderListDto } from '@domain/order/repositories/order.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

function parseAddonsSnapshot(raw: unknown): { name: string; extraPrice: number }[] | null {
  if (raw == null) return null;
  if (!Array.isArray(raw)) return null;
  const out = raw
    .filter((x: any) => x && typeof x.name === 'string')
    .map((x: any) => ({
      name: String(x.name).slice(0, 120),
      extraPrice: Math.max(0, Number(x.extraPrice) || 0),
    }));
  return out.length ? out : null;
}

@Injectable()
export class OrderPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(order: Order, companyUuid?: string): Promise<Order> {
    const client = this.prisma.client as any;
    if (companyUuid) {
      const table = await client.table.findFirst({
        where: { uuid: order.tableUuid, companyUuid },
      });
      if (!table) throw new Error('Mesa não encontrada ou não pertence à sua empresa');
    }
    await client.order.create({
      data: {
        uuid: order.uuid,
        tableUuid: order.tableUuid,
        status: order.status,
        observacao: order.observacao,
        items: {
          create: order.items.map((item: any) => ({
            uuid: item.uuid,
            productUuid: item.productUuid,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            addonsSnapshot:
              item.addonsSnapshot && item.addonsSnapshot.length > 0
                ? item.addonsSnapshot
                : undefined,
          })),
        },
      },
    });
    return order;
  }

  async findAll(filters?: { tableUuid?: string; status?: string; companyUuid?: string }): Promise<OrderListDto[]> {
    const client = this.prisma.client as any;
    const where: any = {};
    if (filters?.tableUuid) where.tableUuid = filters.tableUuid;
    if (filters?.status) where.status = filters.status;
    if (filters?.companyUuid) where.table = { companyUuid: filters.companyUuid };

    const rows = await client.order.findMany({
      where,
      include: { table: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row: any) => this.toListDto(row));
  }

  async findById(uuid: string, companyUuid?: string): Promise<OrderListDto | null> {
    const client = this.prisma.client as any;
    const where: any = { uuid };
    if (companyUuid) where.table = { companyUuid };
    const row = await client.order.findFirst({
      where,
      include: { table: true, items: { include: { product: true } } },
    });
    if (!row) return null;
    return this.toListDto(row);
  }

  async update(order: Order): Promise<void> {
    const client = this.prisma.client as any;
    await client.order.update({
      where: { uuid: order.uuid },
      data: { status: order.status },
    });
  }

  async destroy(uuid: string, companyUuid?: string): Promise<void> {
    const client = this.prisma.client as any;
    if (companyUuid) {
      const order = await client.order.findFirst({
        where: { uuid, table: { companyUuid } },
      });
      if (!order) return;
    }
    await client.order.delete({ where: { uuid } });
  }

  private toListDto(row: any): OrderListDto {
    return {
      uuid: row.uuid,
      tableUuid: row.tableUuid,
      tableNumber: row.table?.number ?? 0,
      status: row.status,
      createdAt: row.createdAt,
      observacao: row.observacao ?? null,
      items: (row.items || []).map((item: any) => ({
        uuid: item.uuid,
        productUuid: item.productUuid,
        productName: item.product?.name ?? '',
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        addonsSnapshot: parseAddonsSnapshot(item.addonsSnapshot),
      })),
    };
  }
}
