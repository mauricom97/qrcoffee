import { CategoryRepository } from '@domain/category/repositories/category.repository';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }
  async execute(body): Promise<any> {
    return await this.categoryRepository.save(body);
  }
}
