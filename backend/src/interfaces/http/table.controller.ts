import { Body } from '@nestjs/common'
import { Controller, Post } from '@nestjs/common'
import { CreateTableUseCase } from '@application/table/use-cases/create-table.usecase'

@Controller('tables')
export class TableController {
  constructor(
    private readonly createTableUseCase: CreateTableUseCase,
  ) { }
  
  @Post()
    async create(@Body() body: any) {
        return await this.createTableUseCase.execute(body.number)
    }
}

