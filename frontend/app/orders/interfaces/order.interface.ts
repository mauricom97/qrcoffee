export interface OrderItemDto {
  uuid: string;
  productUuid: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  addonsSnapshot?: { name: string; extraPrice: number }[] | null;
}

export interface OrderDto {
  uuid: string;
  tableUuid: string;
  tableNumber: number;
  status: OrderStatus;
  createdAt: string;
  observacao?: string | null;
  items: OrderItemDto[];
}

export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "DELIVERED";

export interface Comanda {
  id: number;
  description: string;
}
