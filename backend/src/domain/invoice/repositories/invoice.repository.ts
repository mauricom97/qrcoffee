import { Invoice } from '../entities/invoice.entity';

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<Invoice>;
  findByOrderUuid(orderUuid: string, companyUuid?: string): Promise<Invoice | null>;
  findById(uuid: string, companyUuid?: string): Promise<Invoice | null>;
  updateStatus(uuid: string, status: string, extra?: { nfceKey?: string; providerId?: string; errorMessage?: string; emittedAt?: Date; xmlUrl?: string; pdfUrl?: string }): Promise<void>;
}
