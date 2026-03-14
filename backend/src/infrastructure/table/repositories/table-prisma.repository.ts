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
                number: table.number,
                description: table.description,
                qrCode: table.qrCode,
            },
        });
    }

    async findAll(_filters?: unknown): Promise<Table[]> {
        return await this.prisma.client.table.findMany();
    }

    async findById(uuid: string): Promise<Table | null> {
        const row = await this.prisma.client.table.findUnique({
            where: { uuid },
        });
        if (!row) return null;
        return new Table(row.uuid, row.number, row.description ?? undefined, row.qrCode ?? undefined);
    }

    async update(table: Table): Promise<void> {
        await this.prisma.client.table.update({
            where: { uuid: table.uuid },
            data: {
                number: table.number,
                description: table.description ?? '',
                qrCode: table.qrCode ?? '',
            },
        });
    }

    async destroy(uuid: string): Promise<void> {
        await this.prisma.client.table.delete({
            where: { uuid },
        });
    }
}

@Module({
    providers: [PrismaService, TablePrismaRepository],
    exports: [TablePrismaRepository],
})
export class CategoryModule { }