import type { OrderAddonSnapshot } from '../types/order-addon-snapshot';

export class OrderItem {
  constructor(
    public readonly uuid: string,
    public orderUuid: string,
    public productUuid: string,
    public quantity: number,
    public unitPrice: number,
    public readonly addonsSnapshot: OrderAddonSnapshot[] | null = null,
  ) {
    if (quantity <= 0) throw new Error('Quantity must be greater than 0');
    if (unitPrice < 0) throw new Error('Unit price cannot be negative');
  }
}
