import { CompanyFiscalConfig } from '@domain/fiscal/entities/company-fiscal-config.entity';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyFiscalConfigPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCompanyUuid(companyUuid: string): Promise<CompanyFiscalConfig | null> {
    const rows = await this.prisma.client.$queryRawUnsafe<any[]>(
      'SELECT * FROM "CompanyFiscalConfig" WHERE "companyUuid" = $1 LIMIT 1',
      companyUuid,
    );
    const row = rows[0];
    return row ? this.toEntity(row) : null;
  }

  async save(config: CompanyFiscalConfig): Promise<CompanyFiscalConfig> {
    const existing = await this.findByCompanyUuid(config.companyUuid);
    const now = new Date();
    if (existing) {
      await this.prisma.client.$executeRawUnsafe(
        `UPDATE "CompanyFiscalConfig" SET
          "cnpj" = $1, "razaoSocial" = $2, "nomeFantasia" = $3, "logradouro" = $4,
          "numero" = $5, "complemento" = $6, "bairro" = $7, "cidade" = $8,
          "uf" = $9, "cep" = $10, "inscricaoEstadual" = $11, "regimeTributario" = $12,
          "provider" = $13, "providerApiKey" = $14, "ncmPadrao" = $15, "cfopPadrao" = $16,
          "updatedAt" = $17
        WHERE "companyUuid" = $18`,
        config.cnpj,
        config.razaoSocial,
        config.nomeFantasia,
        config.logradouro,
        config.numero,
        config.complemento,
        config.bairro,
        config.cidade,
        config.uf,
        config.cep,
        config.inscricaoEstadual,
        config.regimeTributario,
        config.provider,
        config.providerApiKey,
        config.ncmPadrao,
        config.cfopPadrao,
        now,
        config.companyUuid,
      );
    } else {
      await this.prisma.client.$executeRawUnsafe(
        `INSERT INTO "CompanyFiscalConfig" (
          "uuid", "companyUuid", "cnpj", "razaoSocial", "nomeFantasia", "logradouro",
          "numero", "complemento", "bairro", "cidade", "uf", "cep",
          "inscricaoEstadual", "regimeTributario", "provider", "providerApiKey",
          "ncmPadrao", "cfopPadrao", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
        config.uuid,
        config.companyUuid,
        config.cnpj,
        config.razaoSocial,
        config.nomeFantasia,
        config.logradouro,
        config.numero,
        config.complemento,
        config.bairro,
        config.cidade,
        config.uf,
        config.cep,
        config.inscricaoEstadual,
        config.regimeTributario,
        config.provider,
        config.providerApiKey,
        config.ncmPadrao,
        config.cfopPadrao,
        now,
        now,
      );
    }
    return config;
  }

  private toEntity(row: any): CompanyFiscalConfig {
    return new CompanyFiscalConfig(
      row.uuid,
      row.companyUuid,
      row.cnpj,
      row.razaoSocial,
      row.nomeFantasia,
      row.logradouro,
      row.numero,
      row.complemento,
      row.bairro,
      row.cidade,
      row.uf,
      row.cep,
      row.inscricaoEstadual,
      row.regimeTributario,
      row.provider,
      row.providerApiKey,
      row.ncmPadrao,
      row.cfopPadrao,
    );
  }
}
