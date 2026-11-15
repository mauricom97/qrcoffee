-- DropForeignKey
ALTER TABLE "CashierMovement" DROP CONSTRAINT "CashierMovement_sessionUuid_fkey";

-- DropForeignKey
ALTER TABLE "CashierSession" DROP CONSTRAINT "CashierSession_companyUuid_fkey";
