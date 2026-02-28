import { ProductRepository } from '@domain/product/repositories/product.repository';
// import { Product } from '@domain/product/entities/product.entity';
import { UpdateProductDTO } from '@interfaces/product/dto/update-product.dto';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) { }

  // async execute(input: UpdateProductDTO): Promise<void> {

  // await this.productRepository.update();
}