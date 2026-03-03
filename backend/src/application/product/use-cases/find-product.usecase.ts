// application/product/use-cases/create-product.usecase.ts
import { ProductRepository } from '@domain/product/repositories/product.repository';

export class FindAllProductUseCase {
  constructor(private readonly productRepository: ProductRepository) { }

  async execute(filters): Promise<any> {
    return await this.productRepository.findAll({
      ...filters,
    });
  }
}
