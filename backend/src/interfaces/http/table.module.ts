import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { CreateTableUseCase } from '@application/table/use-cases/create-table.usecase';
import { FindAllTableUseCase } from '@application/table/use-cases/find-table.usecase';
import { FindOneTableUseCase } from '@application/table/use-cases/find-one-table.usecase';
import { UpdateTableUseCase } from '@application/table/use-cases/update-table.usecase';
import { DeleteTableUseCase } from '@application/table/use-cases/delete-table.usecase';
import { AcknowledgeAttendantCallUseCase } from '@application/table/use-cases/acknowledge-attendant-call.usecase';
import { TablePrismaRepository } from '@infrastructure/table/repositories/table-prisma.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { RealtimeModule } from '@interfaces/websocket/realtime.module';
import { PermissionsModule } from './permissions.module';

@Module({
    imports: [RealtimeModule, PermissionsModule],
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
        {
            provide: FindAllTableUseCase,
            useFactory: (repo) => new FindAllTableUseCase(repo),
            inject: ['TableRepository'],
        },
        {
            provide: FindOneTableUseCase,
            useFactory: (repo) => new FindOneTableUseCase(repo),
            inject: ['TableRepository'],
        },
        {
            provide: UpdateTableUseCase,
            useFactory: (repo) => new UpdateTableUseCase(repo),
            inject: ['TableRepository'],
        },
        {
            provide: DeleteTableUseCase,
            useFactory: (repo) => new DeleteTableUseCase(repo),
            inject: ['TableRepository'],
        },
        {
            provide: AcknowledgeAttendantCallUseCase,
            useFactory: (repo) => new AcknowledgeAttendantCallUseCase(repo),
            inject: ['TableRepository'],
        },
    ],
})
export class TableModule {}