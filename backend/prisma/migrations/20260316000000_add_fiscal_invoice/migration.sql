-- CreateTable
CREATE TABLE "CompanyFiscalConfig" (
    "uuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "inscricaoEstadual" TEXT,
    "regimeTributario" TEXT NOT NULL DEFAULT '1',
    "provider" TEXT NOT NULL DEFAULT 'mock',
    "providerApiKey" TEXT,
    "ncmPadrao" TEXT NOT NULL DEFAULT '2203.00.00',
    "cfopPadrao" TEXT NOT NULL DEFAULT '5102',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyFiscalConfig_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "uuid" TEXT NOT NULL,
    "orderUuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "nfceKey" TEXT,
    "providerId" TEXT,
    "errorMessage" TEXT,
    "emittedAt" TIMESTAMP(3),
    "xmlUrl" TEXT,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyFiscalConfig_companyUuid_key" ON "CompanyFiscalConfig"("companyUuid");

-- CreateIndex
CREATE INDEX "Invoice_orderUuid_idx" ON "Invoice"("orderUuid");

-- CreateIndex
CREATE INDEX "Invoice_companyUuid_idx" ON "Invoice"("companyUuid");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");
