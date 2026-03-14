import { TableRepository } from '@domain/table/repositories/table.repository';
import { Table } from '@domain/table/entities/table.entity';

export class FindOneTableUseCase {
    constructor(private readonly tableRepository: TableRepository) {}

    async execute(uuid: string): Promise<Table | null> {
        return await this.tableRepository.findById(uuid);
    }
}
