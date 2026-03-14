import { Order } from '../entities/order.entity';

export interface OrderItemDto {
  uuid: string;
  productUuid: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderListDto {
  uuid: string;
  tableUuid: string;
  tableNumber: number;
  status: string;
  createdAt: Date;
  items: OrderItemDto[];
}

export interface OrderRepository {
  save(order: Order, companyUuid?: string): Promise<Order>;
  findAll(filters?: { tableUuid?: string; status?: string; companyUuid?: string }): Promise<OrderListDto[]>;
  findById(uuid: string, companyUuid?: string): Promise<OrderListDto | null>;
  update(order: Order): Promise<void>;
  destroy(uuid: string, companyUuid?: string): Promise<void>;
}
