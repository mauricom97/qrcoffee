// interfaces/product/product.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductUseCase } from '@application/product/use-cases/create-prodcut.usecase';
import { randomUUID } from 'crypto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    await this.createProductUseCase.execute({
      id: randomUUID(),
      name: dto.name,
      price: dto.price,
    });

    return { message: 'Product created successfully' };
  }
}
