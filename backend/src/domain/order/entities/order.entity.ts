import { OrderItem } from './order-item.entity';

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED';

export class Order {
  constructor(
    public readonly uuid: string,
    public tableUuid: string,
    public status: OrderStatus,
    public readonly createdAt: Date,
    public observacao: string | null,
    public items: OrderItem[],
  ) {}
}
