// application/product/use-cases/create-product.usecase.ts
import { randomUUID } from 'node:crypto';
import { ProductRepository } from '@domain/product/repositories/product.repository';
import { Product } from '@domain/product/entities/product.entity';
import { CreateProductDto } from '@interfaces/product/dto/create-product.dto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: CreateProductDto): Promise<void> {
    const uuid = input.uuid?.trim() ? input.uuid : randomUUID();
    const product = new Product(
      uuid,
      input.name,
      input.price,
      input.active,
      input.description,
      input.categoryUuid,
      input.companyUuid,
    );
    return await this.productRepository.save(product);
  }
}
