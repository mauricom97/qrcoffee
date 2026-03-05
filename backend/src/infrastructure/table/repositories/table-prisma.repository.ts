import { Table } from '@domain/table/entities/table.entity';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TablePrismaRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(table: Table): Promise<Table> {
        return await this.prisma.client.table.create({
            data: {
                uuid: table.uuid,
                number: table.number
            },
        });
    }
}

@Module({
  providers: [PrismaService, TablePrismaRepository],
  exports: [TablePrismaRepository],
})
export class CategoryModule { }