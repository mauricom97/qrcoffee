// src/interfaces/http/product.controller.ts
import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CreateProductUseCase } from '@/application/product/use-cases/create-product.usecase';
import { CreateManyProductsUseCase } from '@/application/product/use-cases/create-many-product.usecase';
import { FindAllProductUseCase } from '@/application/product/use-cases/find-product.usecase';
import { DestroyProductUseCase } from '@/application/product/use-cases/destroy-product.usecase';
import { UpdateProductUseCase } from '@/application/product/use-cases/update-product.usecase';
import { UpdateProductDTO } from '@/interfaces/product/dto/update-product.dto'
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly createManyProductsUseCase: CreateManyProductsUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly destroyProductUseCase: DestroyProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) { }

  @Post()
  async create(@Body() body: any) {
    return await this.createProductUseCase.execute(body);
  }

  @Post('/many')
  async createMany(@Body() body: any) {
    return await this.createManyProductsUseCase.execute(body);
  }

  @Put()
  async update(@Body() body: UpdateProductDTO, @Query('uuid') uuid: string) {
    return await this.updateProductUseCase.execute(body, uuid);
  }

  @Get('/all')
  async findAll() {
    return await this.findAllProductUseCase.execute();
  }

  @Delete()
  async destroy(@Body() body: any) {
    return await this.destroyProductUseCase.execute(body);
  }
}
