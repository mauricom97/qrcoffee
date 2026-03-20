import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EmitInvoiceFromOrderUseCase } from '@application/invoice/use-cases/emit-invoice-from-order.usecase';
import { FindInvoiceByOrderUseCase } from '@application/invoice/use-cases/find-invoice-by-order.usecase';
import { FindOneOrderUseCase } from '@application/order/use-cases/find-one-order.usecase';
import { GetCompanyFiscalConfigUseCase } from '@application/fiscal/use-cases/get-company-fiscal-config.usecase';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
  constructor(
    private readonly emitInvoiceUseCase: EmitInvoiceFromOrderUseCase,
    private readonly findInvoiceByOrderUseCase: FindInvoiceByOrderUseCase,
    private readonly findOneOrderUseCase: FindOneOrderUseCase,
    private readonly getFiscalConfigUseCase: GetCompanyFiscalConfigUseCase,
  ) {}

  @Post('order/:orderUuid/emit')
  async emitFromOrder(
    @Param('orderUuid', ParseUUIDPipe) orderUuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    const order = await this.findOneOrderUseCase.execute(orderUuid, companyUuid);
    if (!order) throw new NotFoundException('Pedido não encontrado');

    const fiscalConfig = await this.getFiscalConfigUseCase.execute(companyUuid);
    if (!fiscalConfig) {
      throw new BadRequestException(
        'Configure os dados fiscais da empresa antes de emitir NFC-e. Acesse Configurações > Dados Fiscais.',
      );
    }

    const invoice = await this.emitInvoiceUseCase.execute(order, fiscalConfig, companyUuid);
    return {
      uuid: invoice.uuid,
      orderUuid: invoice.orderUuid,
      status: invoice.status,
      nfceKey: invoice.nfceKey,
      emittedAt: invoice.emittedAt,
      xmlUrl: invoice.xmlUrl,
      pdfUrl: invoice.pdfUrl,
    };
  }

  @Get('order/:orderUuid')
  async findByOrder(
    @Param('orderUuid', ParseUUIDPipe) orderUuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    const invoice = await this.findInvoiceByOrderUseCase.execute(orderUuid, companyUuid);
    if (!invoice) return null;
    return {
      uuid: invoice.uuid,
      orderUuid: invoice.orderUuid,
      status: invoice.status,
      nfceKey: invoice.nfceKey,
      errorMessage: invoice.errorMessage,
      emittedAt: invoice.emittedAt,
      xmlUrl: invoice.xmlUrl,
      pdfUrl: invoice.pdfUrl,
    };
  }
}
