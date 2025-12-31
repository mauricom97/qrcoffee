// domain/product/value-objects/price.vo.ts
export class Price {
    constructor(public readonly value: number) {
      if (value <= 0) {
        throw new Error('Price must be greater than zero');
      }
    }
  }
  