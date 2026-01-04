// src/interfaces/http/product.controller.ts
import { Body, Controller, Post } from '@nestjs/common'
import { CreateProductUseCase } from '@/application/product/use-cases/create-product.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
  ) {}

  @Post()
  async create(@Body() body: any) {
    await this.createProductUseCase.execute(body)
    return { message: 'Produto criado com sucesso' }
  }
}
