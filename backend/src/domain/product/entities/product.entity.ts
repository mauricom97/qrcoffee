export class Product {
  constructor(
    public readonly uuid: string,
    public name: string,
    public price: number,
    public active: boolean,
    public description: string,
    public categoryUuid: string,
    public companyUuid: string,
  ) {
    if (!name) {
      throw new Error('Product name is required');
    }
    if(!price) {
      throw new Error('Product price is required');
    }
    if (!active) {
      this.active = false;
    }
  }
}
