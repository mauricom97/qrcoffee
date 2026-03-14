import { TableRepository } from '@domain/table/repositories/table.repository';

export class DeleteTableUseCase {
    constructor(private readonly tableRepository: TableRepository) {}

    async execute(uuid: string): Promise<void> {
        await this.tableRepository.destroy(uuid);
    }
}
