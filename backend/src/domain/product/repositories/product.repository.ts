import { Product } from '../entities/product.entity';
import { ProductWithCategoryDto } from '@interfaces/product/dto/product-category.dto';
import type { ProductAddonInput } from '../types/product-addon-input';

export interface ProductRepository {
  save(product: Product, addons?: ProductAddonInput[]): Promise<void>;
  saveMany(products: Product[]): Promise<void>;
  update(product: any): Promise<void>;
  findAll(product: any): Promise<ProductWithCategoryDto[]>;
  findById(uuid: string): Promise<Product | null>;
  destroy(uuid: string): Promise<void>;
}
