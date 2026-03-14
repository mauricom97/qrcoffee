import { CategoryRepository } from '@domain/category/repositories/category.repository';

export class FindAllCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(companyUuid?: string): Promise<any> {
    return await this.categoryRepository.findAll(companyUuid);
  }
}
