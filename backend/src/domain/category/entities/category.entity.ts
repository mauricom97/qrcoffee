export class Category {
  constructor(
    public readonly uuid: string,
    public name: string,
    public companyUuid?: string,
  ) {
    if (!name) {
      throw new Error('Category name is required');
    }
  }
}
