-- Relacionar Category, Product e Table à Company (multi-tenancy SaaS)
-- Cria Company se não existir (alguns ambientes não tinham essa tabela nas migrations iniciais).

-- Criar tabela Company se não existir
CREATE TABLE IF NOT EXISTS "Company" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Company_pkey" PRIMARY KEY ("uuid")
);

-- Garantir que existe ao menos uma empresa (para backfill)
INSERT INTO "Company" ("uuid", "name", "createdAt")
SELECT gen_random_uuid()::text, 'Empresa Padrão', NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Company" LIMIT 1);

-- Category: adicionar companyUuid
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "companyUuid" TEXT;
UPDATE "Category" SET "companyUuid" = (SELECT "uuid" FROM "Company" LIMIT 1) WHERE "companyUuid" IS NULL;
ALTER TABLE "Category" ALTER COLUMN "companyUuid" SET NOT NULL;
CREATE INDEX IF NOT EXISTS "Category_companyUuid_idx" ON "Category"("companyUuid");

-- Product: adicionar companyUuid
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "companyUuid" TEXT;
UPDATE "Product" SET "companyUuid" = (SELECT "uuid" FROM "Company" LIMIT 1) WHERE "companyUuid" IS NULL;
ALTER TABLE "Product" ALTER COLUMN "companyUuid" SET NOT NULL;
CREATE INDEX IF NOT EXISTS "Product_companyUuid_idx" ON "Product"("companyUuid");

-- Table: remover unique em number, adicionar companyUuid e unique(companyUuid, number)
DROP INDEX IF EXISTS "Table_number_key";
ALTER TABLE "Table" ADD COLUMN IF NOT EXISTS "companyUuid" TEXT;
UPDATE "Table" SET "companyUuid" = (SELECT "uuid" FROM "Company" LIMIT 1) WHERE "companyUuid" IS NULL;
ALTER TABLE "Table" ALTER COLUMN "companyUuid" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "Table_companyUuid_number_key" ON "Table"("companyUuid", "number");
CREATE INDEX IF NOT EXISTS "Table_companyUuid_idx" ON "Table"("companyUuid");
