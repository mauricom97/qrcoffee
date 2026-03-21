import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateProductUseCase } from '@/application/product/use-cases/create-product.usecase';
import { CreateManyProductsUseCase } from '@/application/product/use-cases/create-many-product.usecase';
import { FindAllProductUseCase } from '@/application/product/use-cases/find-product.usecase';
import { DestroyProductUseCase } from '@/application/product/use-cases/destroy-product.usecase';
import { UpdateProductUseCase } from '@/application/product/use-cases/update-product.usecase';
import { UpdateProductDTO } from '@/interfaces/product/dto/update-product.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CompanyUuid } from './decorators/company.decorator';
import { RealtimeGateway } from '@interfaces/websocket/realtime.gateway';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly createManyProductsUseCase: CreateManyProductsUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly destroyProductUseCase: DestroyProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly realtime: RealtimeGateway,
  ) { }

  @Post()
  async create(@CompanyUuid() companyUuid: string, @Body() body: any) {
    const result = await this.createProductUseCase.execute({ ...body, companyUuid });
    this.realtime.emitProductsUpdate(companyUuid);
    this.realtime.emitMenuUpdate(companyUuid);
    return result;
  }

  @Post('/many')
  async createMany(@CompanyUuid() companyUuid: string, @Body() body: any) {
    const items = Array.isArray(body) ? body : body.products ?? [];
    const withCompany = items.map((item: any) => ({ ...item, companyUuid }));
    const result = await this.createManyProductsUseCase.execute(withCompany);
    this.realtime.emitProductsUpdate(companyUuid);
    this.realtime.emitMenuUpdate(companyUuid);
    return result;
  }

  @Put()
  async update(@Body() body: UpdateProductDTO, @Query('uuid') uuid: string, @CompanyUuid() companyUuid: string) {
    const result = await this.updateProductUseCase.execute(body, uuid);
    this.realtime.emitProductsUpdate(companyUuid);
    this.realtime.emitMenuUpdate(companyUuid);
    return result;
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
  async destroy(@Body() body: any, @CompanyUuid() companyUuid: string) {
    const result = await this.destroyProductUseCase.execute(body);
    this.realtime.emitProductsUpdate(companyUuid);
    this.realtime.emitMenuUpdate(companyUuid);
    return result;
  }
}
