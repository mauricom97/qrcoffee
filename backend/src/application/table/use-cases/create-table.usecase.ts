import { TableRepository } from "@domain/table/repositories/table.repository";

interface CreateTable {
    uuid?: string;
    number: number;
    description?: string;
    qrCode?: string;
    baseUrl?: string;
    companyUuid: string;
}
export class CreateTableUseCase {
    constructor(private readonly tableRepository: TableRepository) { }

    async execute(body: CreateTable): Promise<{ uuid: string; number: number; description: string; qrCode: string }> {
        const uuid = crypto.randomUUID();
        const baseUrl = body.baseUrl || process.env.FRONTEND_URL || '';
        const qrCode = body.qrCode || (baseUrl ? `${baseUrl.replace(/\/$/, '')}/cardapio?mesa=${uuid}` : '');
        const table = {
            uuid,
            number: body.number,
            description: body.description ?? '',
            qrCode,
            companyUuid: body.companyUuid,
        };
        await this.tableRepository.save(table as any);
        return {
            uuid: table.uuid,
            number: table.number,
            description: table.description,
            qrCode: table.qrCode,
        };
    }
}
