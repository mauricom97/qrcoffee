// application/product/use-cases/create-product.usecase.ts
import { ProductRepository } from '@domain/product/repositories/product.repository';
import { Product } from '@domain/product/entities/product.entity';
import { CreateProductDto } from '@interfaces/product/dto/create-product.dto'

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: CreateProductDto): Promise<void> {
    const product = new Product(
      input.uuid,
      input.name,
      input.price,
      input.active,
      input.description,
      input.categoryUuid
    );
    return await this.productRepository.save(product);
  }
}
