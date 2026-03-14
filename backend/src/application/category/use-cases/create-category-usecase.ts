import { CategoryRepository } from '@domain/category/repositories/category.repository';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }
  async execute(body: { name: string; companyUuid: string }): Promise<any> {
    return await this.categoryRepository.save(body as any);
  }
}
