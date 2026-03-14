import { Body, Param, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { Controller, Post, Get, Patch, Delete } from '@nestjs/common';
import { CreateTableUseCase } from '@application/table/use-cases/create-table.usecase';
import { FindAllTableUseCase } from '@application/table/use-cases/find-table.usecase';
import { FindOneTableUseCase } from '@application/table/use-cases/find-one-table.usecase';
import { UpdateTableUseCase } from '@application/table/use-cases/update-table.usecase';
import { DeleteTableUseCase } from '@application/table/use-cases/delete-table.usecase';

@Controller('tables')
export class TableController {
  constructor(
    private readonly createTableUseCase: CreateTableUseCase,
    private readonly findAllTableUseCase: FindAllTableUseCase,
    private readonly findOneTableUseCase: FindOneTableUseCase,
    private readonly updateTableUseCase: UpdateTableUseCase,
    private readonly deleteTableUseCase: DeleteTableUseCase,
  ) {}

  @Post()
  async create(@Body() body: { number: number; description?: string; qrCode?: string }) {
    return await this.createTableUseCase.execute(body);
  }

  @Get()
  async findAll() {
    return await this.findAllTableUseCase.execute({});
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const table = await this.findOneTableUseCase.execute(uuid);
    if (!table) throw new NotFoundException('Mesa não encontrada');
    return table;
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() body: { number?: number; description?: string; qrCode?: string },
  ) {
    const table = await this.updateTableUseCase.execute(uuid, body);
    if (!table) throw new NotFoundException('Mesa não encontrada');
    return table;
  }

  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.deleteTableUseCase.execute(uuid);
  }
}

