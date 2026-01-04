// application/product/use-cases/create-product.usecase.ts
import { ProductRepository } from '@domain/product/repositories/product.repository';
import { Product } from '@domain/product/entities/product.entity';
import { DestroyProductDto } from '@interfaces/product/dto/destroy-product.dto'

export class DestroyProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: DestroyProductDto): Promise<void> {
    const uuid = input.uuid;
    return await this.productRepository.destroy(uuid);
  }
}
