import { TableRepository } from "@domain/table/repositories/table.repository";

export class FindAllTableUseCase {
    constructor(private readonly tableRepository: TableRepository) {}

    async execute(filters: { companyUuid?: string } = {}): Promise<any> {
        return await this.tableRepository.findAll(filters);
    }
}