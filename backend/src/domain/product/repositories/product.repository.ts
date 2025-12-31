// domain/product/repositories/product.repository.ts
import { Product } from '../entities/product.entity';

export interface ProductRepository {
  save(product: Product): Promise<void>;
}
