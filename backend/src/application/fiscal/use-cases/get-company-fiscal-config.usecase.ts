import { CompanyFiscalConfig } from '@domain/fiscal/entities/company-fiscal-config.entity';

export class GetCompanyFiscalConfigUseCase {
  constructor(
    private readonly fiscalConfigRepository: { findByCompanyUuid: (companyUuid: string) => Promise<CompanyFiscalConfig | null> },
  ) {}

  async execute(companyUuid: string): Promise<CompanyFiscalConfig | null> {
    return await this.fiscalConfigRepository.findByCompanyUuid(companyUuid);
  }
}
