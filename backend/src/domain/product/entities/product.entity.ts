// domain/product/entities/product.entity.ts
import { Price } from '../value-objects/price.vo';

export class Product {
  constructor(
    public readonly uuid: string,
    public name: string,
    public price: Price,
    public categoryUuid: string,
  ) {
    if (!name) {
      throw new Error('Product name is required');
    }
  }
}
