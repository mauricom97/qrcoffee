import { Invoice } from '@domain/invoice/entities/invoice.entity';
import { InvoiceRepository } from '@domain/invoice/repositories/invoice.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoicePrismaRepository implements InvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(invoice: Invoice): Promise<Invoice> {
    await this.prisma.client.$executeRawUnsafe(
      `INSERT INTO "Invoice" (
        "uuid", "orderUuid", "companyUuid", "status", "nfceKey", "providerId",
        "errorMessage", "emittedAt", "xmlUrl", "pdfUrl"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      invoice.uuid,
      invoice.orderUuid,
      invoice.companyUuid,
      invoice.status,
      invoice.nfceKey,
      invoice.providerId,
      invoice.errorMessage,
      invoice.emittedAt,
      invoice.xmlUrl,
      invoice.pdfUrl,
    );
    return invoice;
  }

  async findByOrderUuid(orderUuid: string, companyUuid?: string): Promise<Invoice | null> {
    const query =
      companyUuid != null
        ? 'SELECT * FROM "Invoice" WHERE "orderUuid" = $1 AND "companyUuid" = $2 ORDER BY "createdAt" DESC LIMIT 1'
        : 'SELECT * FROM "Invoice" WHERE "orderUuid" = $1 ORDER BY "createdAt" DESC LIMIT 1';
    const rows = await (companyUuid != null
      ? this.prisma.client.$queryRawUnsafe<any[]>(query, orderUuid, companyUuid)
      : this.prisma.client.$queryRawUnsafe<any[]>(query, orderUuid));
    const row = rows[0];
    return row ? this.toEntity(row) : null;
  }

  async findById(uuid: string, companyUuid?: string): Promise<Invoice | null> {
    const query =
      companyUuid != null
        ? 'SELECT * FROM "Invoice" WHERE "uuid" = $1 AND "companyUuid" = $2 LIMIT 1'
        : 'SELECT * FROM "Invoice" WHERE "uuid" = $1 LIMIT 1';
    const rows = await (companyUuid != null
      ? this.prisma.client.$queryRawUnsafe<any[]>(query, uuid, companyUuid)
      : this.prisma.client.$queryRawUnsafe<any[]>(query, uuid));
    const row = rows[0];
    return row ? this.toEntity(row) : null;
  }

  async updateStatus(
    uuid: string,
    status: string,
    extra?: { nfceKey?: string; providerId?: string; errorMessage?: string; emittedAt?: Date; xmlUrl?: string; pdfUrl?: string },
  ): Promise<void> {
    const updates: string[] = ['"status" = $2'];
    const values: any[] = [uuid, status];
    let i = 3;
    if (extra?.nfceKey != null) {
      updates.push(`"nfceKey" = $${i++}`);
      values.push(extra.nfceKey);
    }
    if (extra?.providerId != null) {
      updates.push(`"providerId" = $${i++}`);
      values.push(extra.providerId);
    }
    if (extra?.errorMessage != null) {
      updates.push(`"errorMessage" = $${i++}`);
      values.push(extra.errorMessage);
    }
    if (extra?.emittedAt != null) {
      updates.push(`"emittedAt" = $${i++}`);
      values.push(extra.emittedAt);
    }
    if (extra?.xmlUrl != null) {
      updates.push(`"xmlUrl" = $${i++}`);
      values.push(extra.xmlUrl);
    }
    if (extra?.pdfUrl != null) {
      updates.push(`"pdfUrl" = $${i++}`);
      values.push(extra.pdfUrl);
    }
    await this.prisma.client.$executeRawUnsafe(
      `UPDATE "Invoice" SET ${updates.join(', ')} WHERE "uuid" = $1`,
      ...values,
    );
  }

  private toEntity(row: any): Invoice {
    return new Invoice(
      row.uuid,
      row.orderUuid,
      row.companyUuid,
      row.status,
      row.nfceKey,
      row.providerId,
      row.errorMessage,
      row.emittedAt,
      row.xmlUrl,
      row.pdfUrl,
      row.createdAt,
    );
  }
}
