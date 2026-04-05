-- AlterTable
ALTER TABLE "Company" ADD COLUMN "kitchenHours" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "isKitchenProduct" BOOLEAN NOT NULL DEFAULT false;
