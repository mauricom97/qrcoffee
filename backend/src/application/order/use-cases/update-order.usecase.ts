import { OrderRepository, OrderListDto } from '@domain/order/repositories/order.repository';
import { Order } from '@domain/order/entities/order.entity';
import { OrderStatus } from '@domain/order/entities/order.entity';
import { OrderItem } from '@domain/order/entities/order-item.entity';

export interface UpdateOrderInput {
  status?: OrderStatus;
}

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(uuid: string, input: UpdateOrderInput, companyUuid?: string): Promise<OrderListDto | null> {
    const existing = await this.orderRepository.findById(uuid, companyUuid);
    if (!existing) return null;

    const items = existing.items.map(
      (i) =>
        new OrderItem(
          i.uuid,
          existing.uuid,
          i.productUuid,
          i.quantity,
          i.unitPrice,
          i.addonsSnapshot ?? null,
        ),
    );
    const order = new Order(
      existing.uuid,
      existing.tableUuid,
      input.status ?? (existing.status as OrderStatus),
      existing.createdAt,
      existing.observacao ?? null,
      items,
    );
    await this.orderRepository.update(order);
    return await this.orderRepository.findById(uuid, companyUuid);
  }
}
