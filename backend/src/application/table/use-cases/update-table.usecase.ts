import { TableRepository } from '@domain/table/repositories/table.repository';
import { Table } from '@domain/table/entities/table.entity';

export interface UpdateTableInput {
    number?: number;
    description?: string;
    qrCode?: string;
}

export class UpdateTableUseCase {
    constructor(private readonly tableRepository: TableRepository) {}

    async execute(uuid: string, body: UpdateTableInput): Promise<Table | null> {
        const existing = await this.tableRepository.findById(uuid);
        if (!existing) return null;

        const table = new Table(
            existing.uuid,
            body.number ?? existing.number,
            body.description ?? existing.description,
            body.qrCode ?? existing.qrCode,
        );
        await this.tableRepository.update(table);
        return table;
    }
}
