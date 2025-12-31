// application/product/use-cases/create-product.usecase.ts
import { ProductRepository } from '@domain/product/repositories/product.repository';
import { Product } from '@domain/product/entities/product.entity';
import { Price } from '@domain/product/value-objects/price.vo';

interface CreateProductInput {
  id: string;
  name: string;
  price: number;
}

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: CreateProductInput): Promise<void> {
    const product = new Product(
      input.id,
      input.name,
      new Price(input.price),
      'default-category-uuid'
    );

    await this.productRepository.save(product);
  }
}
