import { randomUUID } from 'node:crypto';
import { ProductRepository } from '@domain/product/repositories/product.repository';
import { Product } from '@domain/product/entities/product.entity';
import { CreateManyProductDto } from '@interfaces/product/dto/create-many-product.dto';

export class CreateManyProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: CreateManyProductDto): Promise<void> {
    const products = input.map(
      (productData) =>
        new Product(
          productData.uuid?.trim() ? productData.uuid : randomUUID(),
          productData.name,
          productData.price,
          productData.active,
          productData.description,
          productData.categoryUuid,
          productData.companyUuid,
        ),
    );
    await this.productRepository.saveMany(products);
  }
}
