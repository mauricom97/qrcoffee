export class OrderItem {
  constructor(
    public readonly uuid: string,
    public orderUuid: string,
    public productUuid: string,
    public quantity: number,
    public unitPrice: number,
  ) {
    if (quantity <= 0) throw new Error('Quantity must be greater than 0');
    if (unitPrice < 0) throw new Error('Unit price cannot be negative');
  }
}
