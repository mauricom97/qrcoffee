export interface OrderItemDto {
  uuid: string;
  productUuid: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDto {
  uuid: string;
  tableUuid: string;
  tableNumber: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItemDto[];
}

export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "DELIVERED";

export interface Comanda {
  id: number;
  description: string;
}
