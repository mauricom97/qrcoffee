import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { CreateTableUseCase } from '@application/table/use-cases/create-table.usecase';
import { TablePrismaRepository } from '@infrastructure/table/repositories/table-prisma.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

@Module({
    controllers: [TableController],
    providers: [
        PrismaService,
        {
            provide: 'TableRepository',
            useClass: TablePrismaRepository,
        },
        {
            provide: CreateTableUseCase,
            useFactory: (repo) => new CreateTableUseCase(repo),
            inject: ['TableRepository'],
        },
    ],
})
export class TableModule {}