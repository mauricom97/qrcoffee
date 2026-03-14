import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  save(category: Category & { companyUuid?: string }): Promise<Category>;
  findAll(companyUuid?: string): Promise<Category[]>;
  findById(uuid: string): Promise<Category | null>;
  destroy(uuid: string): Promise<void>;
}
