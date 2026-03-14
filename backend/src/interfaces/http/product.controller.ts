import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateProductUseCase } from '@/application/product/use-cases/create-product.usecase';
import { CreateManyProductsUseCase } from '@/application/product/use-cases/create-many-product.usecase';
import { FindAllProductUseCase } from '@/application/product/use-cases/find-product.usecase';
import { DestroyProductUseCase } from '@/application/product/use-cases/destroy-product.usecase';
import { UpdateProductUseCase } from '@/application/product/use-cases/update-product.usecase';
import { UpdateProductDTO } from '@/interfaces/product/dto/update-product.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly createManyProductsUseCase: CreateManyProductsUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly destroyProductUseCase: DestroyProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) { }

  @Post()
  async create(@CompanyUuid() companyUuid: string, @Body() body: any) {
    return await this.createProductUseCase.execute({ ...body, companyUuid });
  }

  @Post('/many')
  async createMany(@CompanyUuid() companyUuid: string, @Body() body: any) {
    const items = Array.isArray(body) ? body : body.products ?? [];
    const withCompany = items.map((item: any) => ({ ...item, companyUuid }));
    return await this.createManyProductsUseCase.execute(withCompany);
  }

  @Put()
  async update(@Body() body: UpdateProductDTO, @Query('uuid') uuid: string) {
    return await this.updateProductUseCase.execute(body, uuid);
  }

  @Get('/all')
  async findAll(
    @CompanyUuid() companyUuid: string,
    @Query('categoryUuid') categoryUuid: string,
    @Query('name') name: string,
  ) {
    const filter = {
      companyUuid,
      categoryUuid: categoryUuid || undefined,
      name,
    };
    return await this.findAllProductUseCase.execute(filter);
  }

  @Delete()
  async destroy(@Body() body: any) {
    return await this.destroyProductUseCase.execute(body);
  }
}
