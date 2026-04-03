-- AlterTable
ALTER TABLE "UserGroup" ADD COLUMN "permissions" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- Grupos existentes: acesso completo ao painel (comportamento anterior)
UPDATE "UserGroup"
SET "permissions" = ARRAY[
  'DASHBOARD',
  'PRODUCTS',
  'TABLES',
  'TABS',
  'ORDERS',
  'MENU',
  'CASHIER',
  'STOCK',
  'SETTINGS'
]::TEXT[]
WHERE cardinality("permissions") = 0;
