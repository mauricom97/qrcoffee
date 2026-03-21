import { Body, Param, ParseUUIDPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { Controller, Post, Get, Patch, Delete } from '@nestjs/common';
import { CreateTableUseCase } from '@application/table/use-cases/create-table.usecase';
import { FindAllTableUseCase } from '@application/table/use-cases/find-table.usecase';
import { FindOneTableUseCase } from '@application/table/use-cases/find-one-table.usecase';
import { UpdateTableUseCase } from '@application/table/use-cases/update-table.usecase';
import { DeleteTableUseCase } from '@application/table/use-cases/delete-table.usecase';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('tables')
@UseGuards(JwtAuthGuard)
export class TableController {
  constructor(
    private readonly createTableUseCase: CreateTableUseCase,
    private readonly findAllTableUseCase: FindAllTableUseCase,
    private readonly findOneTableUseCase: FindOneTableUseCase,
    private readonly updateTableUseCase: UpdateTableUseCase,
    private readonly deleteTableUseCase: DeleteTableUseCase,
  ) {}

  @Post()
  async create(
    @CompanyUuid() companyUuid: string,
    @Body() body: { number: number; description?: string; qrCode?: string; baseUrl?: string },
  ) {
    return await this.createTableUseCase.execute({ ...body, companyUuid });
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
    return table;
  }

  @Delete(':uuid')
  async delete(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    await this.deleteTableUseCase.execute(uuid, companyUuid);
  }
}

