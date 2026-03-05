// src/interfaces/http/product.controller.ts
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { CreateCategoryUseCase } from '@/application/category/use-cases/create-category-usecase';
import { FindAllCategoryUseCase } from '@/application/category/use-cases/find-all-category.usecase';
// import { DestroyCategoryUseCase } from '@/application/product/use-cases/destroy-product.usecase';
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
    // private readonly destroyCategoryUseCase: DestroyCategoryUseCase,

  ) { }

  @Post()
  async create(@Body() body: any) {
    return await this.createCategoryUseCase.execute(body)
  }

  @Get('/all')
  async findAll() {
    return await this.findAllCategoryUseCase.execute()
  }

  //   @Delete()
  //   async destroy(@Body() body: any) {
  //     return await this.destroyCategoryUseCase.execute(body)
  //   }
}
