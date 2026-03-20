import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { FiscalController } from './fiscal.controller';
import { OrderModule } from './order.module';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { InvoicePrismaRepository } from '@infrastructure/invoice/repositories/invoice-prisma.repository';
import { CompanyFiscalConfigPrismaRepository } from '@infrastructure/fiscal/repositories/company-fiscal-config-prisma.repository';
import { MockFiscalProvider } from '@infrastructure/fiscal/providers/mock-fiscal.provider';
import { EmitInvoiceFromOrderUseCase } from '@application/invoice/use-cases/emit-invoice-from-order.usecase';
import { FindInvoiceByOrderUseCase } from '@application/invoice/use-cases/find-invoice-by-order.usecase';
import { GetCompanyFiscalConfigUseCase } from '@application/fiscal/use-cases/get-company-fiscal-config.usecase';
import { SaveCompanyFiscalConfigUseCase } from '@application/fiscal/use-cases/save-company-fiscal-config.usecase';

@Module({
  controllers: [InvoiceController, FiscalController],
  imports: [OrderModule],
  providers: [
    PrismaService,
    InvoicePrismaRepository,
    CompanyFiscalConfigPrismaRepository,
    {
      provide: 'FiscalProvider',
      useClass: MockFiscalProvider,
    },
    {
      provide: EmitInvoiceFromOrderUseCase,
      useFactory: (invoiceRepo: InvoicePrismaRepository, provider: MockFiscalProvider) =>
        new EmitInvoiceFromOrderUseCase(invoiceRepo, provider),
      inject: [InvoicePrismaRepository, 'FiscalProvider'],
    },
    {
      provide: FindInvoiceByOrderUseCase,
      useFactory: (repo: InvoicePrismaRepository) => new FindInvoiceByOrderUseCase(repo),
      inject: [InvoicePrismaRepository],
    },
    {
      provide: GetCompanyFiscalConfigUseCase,
      useFactory: (repo: CompanyFiscalConfigPrismaRepository) => new GetCompanyFiscalConfigUseCase(repo),
      inject: [CompanyFiscalConfigPrismaRepository],
    },
    {
      provide: SaveCompanyFiscalConfigUseCase,
      useFactory: (repo: CompanyFiscalConfigPrismaRepository) => new SaveCompanyFiscalConfigUseCase(repo),
      inject: [CompanyFiscalConfigPrismaRepository],
    },
  ],
})
export class InvoiceModule {}
