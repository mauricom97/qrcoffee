import { randomUUID } from 'node:crypto';
import { Invoice } from '@domain/invoice/entities/invoice.entity';
import { InvoiceRepository } from '@domain/invoice/repositories/invoice.repository';
import { FiscalProvider, NfceEmitPayload } from '@domain/fiscal/ports/fiscal-provider.port';
import { CompanyFiscalConfig } from '@domain/fiscal/entities/company-fiscal-config.entity';
import { OrderListDto } from '@domain/order/repositories/order.repository';

export class EmitInvoiceFromOrderUseCase {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly fiscalProvider: FiscalProvider,
  ) {}

  async execute(order: OrderListDto, fiscalConfig: CompanyFiscalConfig, companyUuid: string): Promise<Invoice> {
    const existing = await this.invoiceRepository.findByOrderUuid(order.uuid, companyUuid);
    if (existing && existing.status === 'AUTHORIZED') {
      throw new Error('Este pedido já possui NFC-e autorizada.');
    }

    const total = order.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
    if (total <= 0) {
      throw new Error('O pedido não possui itens com valor para emissão.');
    }

    const invoiceUuid = existing?.uuid ?? randomUUID();
    const invoice = new Invoice(
      invoiceUuid,
      order.uuid,
      companyUuid,
      'PROCESSING',
      null,
      null,
      null,
      null,
      null,
      null,
      new Date(),
    );

    if (!existing) {
      await this.invoiceRepository.save(invoice);
    } else {
      await this.invoiceRepository.updateStatus(invoiceUuid, 'PROCESSING');
    }

    const payload: NfceEmitPayload = {
      emitente: {
        cnpj: fiscalConfig.cnpj.replace(/\D/g, ''),
        razaoSocial: fiscalConfig.razaoSocial,
        nomeFantasia: fiscalConfig.nomeFantasia ?? undefined,
        logradouro: fiscalConfig.logradouro,
        numero: fiscalConfig.numero,
        complemento: fiscalConfig.complemento ?? undefined,
        bairro: fiscalConfig.bairro,
        cidade: fiscalConfig.cidade,
        uf: fiscalConfig.uf,
        cep: fiscalConfig.cep.replace(/\D/g, ''),
        inscricaoEstadual: fiscalConfig.inscricaoEstadual ?? undefined,
        regimeTributario: fiscalConfig.regimeTributario,
      },
      itens: order.items.map((i) => ({
        description: i.productName,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
      ncmPadrao: fiscalConfig.ncmPadrao,
      cfopPadrao: fiscalConfig.cfopPadrao,
    };

    try {
      const result = await this.fiscalProvider.emitirNfce(payload, fiscalConfig.providerApiKey ?? undefined);

      if (result.success) {
        await this.invoiceRepository.updateStatus(invoiceUuid, 'AUTHORIZED', {
          nfceKey: result.nfceKey,
          providerId: result.providerId,
          emittedAt: new Date(),
          xmlUrl: result.xmlUrl,
          pdfUrl: result.pdfUrl,
        });
        return new Invoice(
          invoiceUuid,
          order.uuid,
          companyUuid,
          'AUTHORIZED',
          result.nfceKey ?? null,
          result.providerId ?? null,
          null,
          new Date(),
          result.xmlUrl ?? null,
          result.pdfUrl ?? null,
          new Date(),
        );
      } else {
        await this.invoiceRepository.updateStatus(invoiceUuid, 'ERROR', {
          errorMessage: result.errorMessage ?? 'Erro desconhecido na emissão',
        });
        throw new Error(result.errorMessage ?? 'Falha na emissão da NFC-e');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao emitir NFC-e';
      await this.invoiceRepository.updateStatus(invoiceUuid, 'ERROR', { errorMessage: msg });
      throw err;
    }
  }
}
