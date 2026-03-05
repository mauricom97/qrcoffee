import { ProductRepository } from '@domain/product/repositories/product.repository';
import { UpdateProductDTO } from '@interfaces/product/dto/update-product.dto';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) { }

  async execute(dataForUpdate: UpdateProductDTO, uuid: string) {

    const updateUser = await this.productRepository.update({dataForUpdate, uuid});

    return updateUser;
  }
}