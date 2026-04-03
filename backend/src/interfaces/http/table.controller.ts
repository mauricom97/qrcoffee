import { Body, Param, ParseUUIDPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { Controller, Post, Get, Patch, Delete } from '@nestjs/common';
import { CreateTableUseCase } from '@application/table/use-cases/create-table.usecase';
import { FindAllTableUseCase } from '@application/table/use-cases/find-table.usecase';
import { FindOneTableUseCase } from '@application/table/use-cases/find-one-table.usecase';
import { UpdateTableUseCase } from '@application/table/use-cases/update-table.usecase';
import { DeleteTableUseCase } from '@application/table/use-cases/delete-table.usecase';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid } from './decorators/company.decorator';
import { RealtimeGateway } from '@interfaces/websocket/realtime.gateway';

@Controller('tables')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePanelPermission(PANEL_PERMISSION_CODES.TABLES)
export class TableController {
  constructor(
    private readonly createTableUseCase: CreateTableUseCase,
    private readonly findAllTableUseCase: FindAllTableUseCase,
    private readonly findOneTableUseCase: FindOneTableUseCase,
    private readonly updateTableUseCase: UpdateTableUseCase,
    private readonly deleteTableUseCase: DeleteTableUseCase,
    private readonly realtime: RealtimeGateway,
  ) {}

  @Post()
  async create(
    @CompanyUuid() companyUuid: string,
    @Body() body: { number: number; description?: string; qrCode?: string; baseUrl?: string },
  ) {
    const result = await this.createTableUseCase.execute({ ...body, companyUuid });
    this.realtime.emitTablesUpdate(companyUuid);
    return result;
  }

  @Get()
  async findAll(@CompanyUuid() companyUuid: string) {
    return await this.findAllTableUseCase.execute({ companyUuid });
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    const table = await this.findOneTableUseCase.execute(uuid, companyUuid);
    if (!table) throw new NotFoundException('Mesa não encontrada');
    return table;
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
    @Body() body: { number?: number; description?: string; qrCode?: string },
  ) {
    const table = await this.updateTableUseCase.execute(uuid, body, companyUuid);
    if (!table) throw new NotFoundException('Mesa não encontrada');
    this.realtime.emitTablesUpdate(companyUuid);
    return table;
  }

  @Delete(':uuid')
  async delete(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    await this.deleteTableUseCase.execute(uuid, companyUuid);
    this.realtime.emitTablesUpdate(companyUuid);
  }
}

