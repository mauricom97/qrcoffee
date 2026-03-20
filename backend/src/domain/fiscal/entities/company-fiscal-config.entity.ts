export class CompanyFiscalConfig {
  constructor(
    public readonly uuid: string,
    public readonly companyUuid: string,
    public readonly cnpj: string,
    public readonly razaoSocial: string,
    public readonly nomeFantasia: string | null,
    public readonly logradouro: string,
    public readonly numero: string,
    public readonly complemento: string | null,
    public readonly bairro: string,
    public readonly cidade: string,
    public readonly uf: string,
    public readonly cep: string,
    public readonly inscricaoEstadual: string | null,
    public readonly regimeTributario: string,
    public readonly provider: string,
    public readonly providerApiKey: string | null,
    public readonly ncmPadrao: string,
    public readonly cfopPadrao: string,
  ) {}
}
