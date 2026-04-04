import { OrderRepository } from '@domain/order/repositories/order.repository';
import { Order } from '@domain/order/entities/order.entity';
import { OrderItem } from '@domain/order/entities/order-item.entity';
import { OrderStatus } from '@domain/order/entities/order.entity';

export interface CreateOrderItemInput {
  productUuid: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderInput {
  tableUuid: string;
  status?: OrderStatus;
  items: CreateOrderItemInput[];
  companyUuid?: string;
  /** Texto livre opcional; normalizado e limitado a 500 caracteres. */
  observacao?: string | null;
}

const MAX_OBSERVACAO_LEN = 500;

export function normalizeObservacao(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_OBSERVACAO_LEN);
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    const companyUuid = input.companyUuid;
    const orderUuid = crypto.randomUUID();
    const items = input.items.map(
      (item) =>
        new OrderItem(
          crypto.randomUUID(),
          orderUuid,
          item.productUuid,
          item.quantity,
          item.unitPrice,
        ),
    );
    const order = new Order(
      orderUuid,
      input.tableUuid,
      input.status ?? 'PENDING',
      new Date(),
      normalizeObservacao(input.observacao),
      items,
    );
    return await this.orderRepository.save(order, companyUuid);
  }
}
