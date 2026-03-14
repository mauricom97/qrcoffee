import { Table } from '../entities/table.entity';

export interface TableRepository {
    save(table: Table & { companyUuid: string }): Promise<void>;
    saveMany(tables: (Table & { companyUuid: string })[]): Promise<void>;
    update(table: any): Promise<void>;
    findAll(filters?: { companyUuid?: string }): Promise<Table[]>;
    findById(uuid: string, companyUuid?: string): Promise<Table | null>;
    destroy(uuid: string, companyUuid?: string): Promise<void>;
}