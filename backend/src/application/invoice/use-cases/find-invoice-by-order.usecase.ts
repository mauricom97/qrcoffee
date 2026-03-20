import { Invoice } from '@domain/invoice/entities/invoice.entity';
import { InvoiceRepository } from '@domain/invoice/repositories/invoice.repository';

export class FindInvoiceByOrderUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(orderUuid: string, companyUuid?: string): Promise<Invoice | null> {
    return await this.invoiceRepository.findByOrderUuid(orderUuid, companyUuid);
  }
}
