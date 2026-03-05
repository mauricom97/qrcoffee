import { Table } from '../entities/table.entity';

export interface TableRepository {
    save(table: Table): Promise<void>;
    saveMany(tables: Table[]): Promise<void>;
    update(table: any): Promise<void>;
    findAll(table: any): Promise<Table[]>;
    findById(uuid: string): Promise<Table | null>;
    destroy(uuid: string): Promise<void>;
}