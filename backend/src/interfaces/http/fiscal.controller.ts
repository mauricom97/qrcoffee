import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetCompanyFiscalConfigUseCase } from '@application/fiscal/use-cases/get-company-fiscal-config.usecase';
import { SaveCompanyFiscalConfigUseCase } from '@application/fiscal/use-cases/save-company-fiscal-config.usecase';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('fiscal')
@UseGuards(JwtAuthGuard)
export class FiscalController {
  constructor(
    private readonly getFiscalConfigUseCase: GetCompanyFiscalConfigUseCase,
    private readonly saveFiscalConfigUseCase: SaveCompanyFiscalConfigUseCase,
  ) {}

  @Get('config')
  async getConfig(@CompanyUuid() companyUuid: string) {
    const config = await this.getFiscalConfigUseCase.execute(companyUuid);
    if (!config) return null;
    return {
      cnpj: config.cnpj,
      razaoSocial: config.razaoSocial,
      nomeFantasia: config.nomeFantasia,
      logradouro: config.logradouro,
      numero: config.numero,
      complemento: config.complemento,
      bairro: config.bairro,
      cidade: config.cidade,
      uf: config.uf,
      cep: config.cep,
      inscricaoEstadual: config.inscricaoEstadual,
      regimeTributario: config.regimeTributario,
      provider: config.provider,
      ncmPadrao: config.ncmPadrao,
      cfopPadrao: config.cfopPadrao,
      // providerApiKey nunca é retornado por segurança
    };
  }

  @Post('config')
  async saveConfig(
    @CompanyUuid() companyUuid: string,
    @Body()
    body: {
      cnpj: string;
      razaoSocial: string;
      nomeFantasia?: string;
      logradouro: string;
      numero: string;
      complemento?: string;
      bairro: string;
      cidade: string;
      uf: string;
      cep: string;
      inscricaoEstadual?: string;
      regimeTributario?: string;
      provider?: string;
      providerApiKey?: string;
      ncmPadrao?: string;
      cfopPadrao?: string;
    },
  ) {
    const config = await this.saveFiscalConfigUseCase.execute({
      companyUuid,
      ...body,
    });
    return {
      cnpj: config.cnpj,
      razaoSocial: config.razaoSocial,
      nomeFantasia: config.nomeFantasia,
      logradouro: config.logradouro,
      numero: config.numero,
      complemento: config.complemento,
      bairro: config.bairro,
      cidade: config.cidade,
      uf: config.uf,
      cep: config.cep,
      inscricaoEstadual: config.inscricaoEstadual,
      regimeTributario: config.regimeTributario,
      provider: config.provider,
      ncmPadrao: config.ncmPadrao,
      cfopPadrao: config.cfopPadrao,
    };
  }
}
