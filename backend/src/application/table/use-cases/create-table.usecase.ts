import { TableRepository } from "@domain/table/repositories/table.repository";

export class CreateTableUseCase {
    constructor(private readonly tableRepository: TableRepository) {}
    
    async execute(number: number): Promise<void> {
        const uuid = crypto.randomUUID();
        const table = {
            uuid,
            number,
            active: true,
        };
        return await this.tableRepository.save(table);
    }
}
