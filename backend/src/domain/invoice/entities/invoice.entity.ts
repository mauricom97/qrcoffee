export type InvoiceStatus = 'PENDING' | 'PROCESSING' | 'AUTHORIZED' | 'ERROR' | 'CANCELLED';

export class Invoice {
  constructor(
    public readonly uuid: string,
    public readonly orderUuid: string,
    public readonly companyUuid: string,
    public status: InvoiceStatus,
    public readonly nfceKey: string | null,
    public readonly providerId: string | null,
    public readonly errorMessage: string | null,
    public readonly emittedAt: Date | null,
    public readonly xmlUrl: string | null,
    public readonly pdfUrl: string | null,
    public readonly createdAt: Date,
  ) {}
}
