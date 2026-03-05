import { ProductRepository } from '@domain/product/repositories/product.repository';
import { Product } from '@domain/product/entities/product.entity';
import { CreateManyProductDto } from '@interfaces/product/dto/create-many-product.dto';

export class CreateManyProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: CreateManyProductDto): Promise<void> {
    const products = input.map(
      (productData) =>
        new Product(
          productData.uuid,
          productData.name,
          productData.price,
          productData.active,
          productData.description,
          productData.categoryUuid,
        ),
    );
    await this.productRepository.saveMany(products);
  }
}
