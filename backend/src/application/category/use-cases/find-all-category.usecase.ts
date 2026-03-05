import { CategoryRepository } from '@domain/category/repositories/category.repository';

export class FindAllCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<any> {
    return await this.categoryRepository.findAll();
  }
}
