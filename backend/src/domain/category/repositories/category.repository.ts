
import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  save(category: Category): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(uuid: string): Promise<Category | null>;
  destroy(uuid: string): Promise<void>;
}
