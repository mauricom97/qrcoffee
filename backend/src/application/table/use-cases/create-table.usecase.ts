import { TableRepository } from "@domain/table/repositories/table.repository";

interface CreateTable {
    uuid?: string;
    number: number;
    description?: string;
    qrCode?: string;
    companyUuid: string;
}
export class CreateTableUseCase {
    constructor(private readonly tableRepository: TableRepository) { }

    async execute(body: CreateTable): Promise<void> {
        const uuid = crypto.randomUUID();
        const table = {
            uuid,
            number: body.number,
            description: body.description,
            qrCode: body.qrCode,
            companyUuid: body.companyUuid,
        };
        return await this.tableRepository.save(table as any);
    }
}
