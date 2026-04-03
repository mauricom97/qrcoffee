import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryUseCase } from '@/application/category/use-cases/create-category-usecase';
import { FindAllCategoryUseCase } from '@/application/category/use-cases/find-all-category.usecase';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid } from './decorators/company.decorator';
import { RealtimeGateway } from '@interfaces/websocket/realtime.gateway';

@Controller('categories')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePanelPermission(PANEL_PERMISSION_CODES.PRODUCTS)
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
    private readonly realtime: RealtimeGateway,
  ) {}

  @Post()
  async create(
    @CompanyUuid() companyUuid: string,
    @Body() body: { name: string },
  ) {
    const result = await this.createCategoryUseCase.execute({ ...body, companyUuid });
    this.realtime.emitProductsUpdate(companyUuid);
    this.realtime.emitMenuUpdate(companyUuid);
    return result;
  }

  @Get('/all')
  async findAll(@CompanyUuid() companyUuid: string) {
    return await this.findAllCategoryUseCase.execute(companyUuid);
  }
}
