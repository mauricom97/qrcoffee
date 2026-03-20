import { randomUUID } from 'node:crypto';
import { CompanyFiscalConfig } from '@domain/fiscal/entities/company-fiscal-config.entity';

export interface SaveFiscalConfigInput {
  companyUuid: string;
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
}

export class SaveCompanyFiscalConfigUseCase {
  constructor(
    private readonly fiscalConfigRepository: {
      findByCompanyUuid: (companyUuid: string) => Promise<CompanyFiscalConfig | null>;
      save: (config: CompanyFiscalConfig) => Promise<CompanyFiscalConfig>;
    },
  ) {}

  async execute(input: SaveFiscalConfigInput): Promise<CompanyFiscalConfig> {
    const existing = await this.fiscalConfigRepository.findByCompanyUuid(input.companyUuid);
    const uuid = existing?.uuid ?? randomUUID();

    const config = new CompanyFiscalConfig(
      uuid,
      input.companyUuid,
      input.cnpj.replace(/\D/g, ''),
      input.razaoSocial,
      input.nomeFantasia ?? null,
      input.logradouro,
      input.numero,
      input.complemento ?? null,
      input.bairro,
      input.cidade,
      input.uf,
      input.cep.replace(/\D/g, ''),
      input.inscricaoEstadual ?? null,
      input.regimeTributario ?? '1',
      input.provider ?? 'mock',
      input.providerApiKey ?? null,
      input.ncmPadrao ?? '2203.00.00',
      input.cfopPadrao ?? '5102',
    );

    return await this.fiscalConfigRepository.save(config);
  }
}
