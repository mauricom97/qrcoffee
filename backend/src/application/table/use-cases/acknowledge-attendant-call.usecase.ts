import { TableRepository } from '@domain/table/repositories/table.repository';
import { Table } from '@domain/table/entities/table.entity';

export class AcknowledgeAttendantCallUseCase {
  constructor(private readonly tableRepository: TableRepository) {}

  async execute(uuid: string, companyUuid: string): Promise<Table | null> {
    return this.tableRepository.clearAttendantCall(uuid, companyUuid);
  }
}
