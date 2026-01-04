// src/interfaces/http/product.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateProductUseCase } from '@/application/product/use-cases/create-product.usecase';
import { FindAllProductUseCase } from '@/application/product/use-cases/find-all-product.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,

  ) {}

  @Post()
  async create(@Body() body: any) {
    return await this.createProductUseCase.execute(body)
  }

  @Get('/all')
  async findAll() {
    return await this.findAllProductUseCase.execute()
  }
}
