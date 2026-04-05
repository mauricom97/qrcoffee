import { Table } from '@domain/table/entities/table.entity';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TablePrismaRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(table: Table & { companyUuid?: string }): Promise<void> {
        await this.prisma.client.table.create({
            data: {
                uuid: table.uuid,
                number: table.number,
                description: table.description ?? '',
                qrCode: table.qrCode ?? '',
                companyUuid: (table as any).companyUuid!,
            },
        });
    }

    async findAll(filters?: { companyUuid?: string }): Promise<Table[]> {
        const where = filters?.companyUuid ? { companyUuid: filters.companyUuid } : {};
        const rows = await this.prisma.client.table.findMany({ where, orderBy: { number: 'asc' } });
        return rows.map(
            (row) =>
                new Table(
                    row.uuid,
                    row.number,
                    row.description ?? undefined,
                    row.qrCode ?? undefined,
                    row.companyUuid,
                    row.attendantCallAt,
                    row.attendantCallMessage,
                ),
        );
    }

    async findById(uuid: string, companyUuid?: string): Promise<Table | null> {
        const where: any = { uuid };
        if (companyUuid) where.companyUuid = companyUuid;
        const row = await this.prisma.client.table.findFirst({ where });
        if (!row) return null;
        return new Table(
            row.uuid,
            row.number,
            row.description ?? undefined,
            row.qrCode ?? undefined,
            row.companyUuid,
            row.attendantCallAt,
            row.attendantCallMessage,
        );
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

    async destroy(uuid: string, companyUuid?: string): Promise<void> {
        const where: any = { uuid };
        if (companyUuid) where.companyUuid = companyUuid;
        await this.prisma.client.table.deleteMany({ where });
    }

    async clearAttendantCall(uuid: string, companyUuid: string): Promise<Table | null> {
        const existing = await this.prisma.client.table.findFirst({
            where: { uuid, companyUuid },
        });
        if (!existing) return null;
        const row = await this.prisma.client.table.update({
            where: { uuid },
            data: { attendantCallAt: null, attendantCallMessage: null },
        });
        return new Table(
            row.uuid,
            row.number,
            row.description ?? undefined,
            row.qrCode ?? undefined,
            row.companyUuid,
            row.attendantCallAt,
            row.attendantCallMessage,
        );
    }
}

@Module({
    providers: [PrismaService, TablePrismaRepository],
    exports: [TablePrismaRepository],
})
export class CategoryModule { }