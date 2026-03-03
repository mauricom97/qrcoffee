import { Product } from '../entities/product.entity';
import { ProductWithCategoryDto } from '@interfaces/product/dto/product-category.dto';
export interface ProductRepository {
  save(product: Product): Promise<void>;
  saveMany(products: Product[]): Promise<void>;
  update(product: any): Promise<void>;
  findAll(product: any): Promise<ProductWithCategoryDto[]>;
  findById(uuid: string): Promise<Product | null>;
  destroy(uuid: string): Promise<void>;
}
