// src/interfaces/http/product.controller.ts
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { CreateProductUseCase } from '@/application/product/use-cases/create-product.usecase';
import { FindAllProductUseCase } from '@/application/product/use-cases/find-all-product.usecase';
import { DestroyProductUseCase } from '@/application/product/use-cases/destroy-product.usecase';
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly destroyProductUseCase: DestroyProductUseCase,

  ) {}

  @Post()
  async create(@Body() body: any) {
    return await this.createProductUseCase.execute(body)
  }

  @Get('/all')
  async findAll() {
    return await this.findAllProductUseCase.execute()
  }

  @Delete()
  async destroy(@Body() body: any) {
    return await this.destroyProductUseCase.execute(body)
  }
}
