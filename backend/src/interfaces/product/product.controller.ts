// interfaces/product/product.controller.ts
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateProductUseCase } from '@/application/product/use-cases/create-product.usecase';
import { DestroyProductUseCase } from '@/application/product/use-cases/destroy-product.usecase';
import { randomUUID } from 'crypto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly destroyProductUseCase: DestroyProductUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.createProductUseCase.execute({
      uuid: randomUUID(),
      name: dto.name,
      price: dto.price,
      active: dto.active,
    });
  }

  @Get()
  async findAll() {
    return { message: 'List of products' };
  }

  @Delete()
  async destroy(@Body() dto: { uuid: string }) {
    return await this.destroyProductUseCase.execute({ uuid: dto.uuid });
  }
}
