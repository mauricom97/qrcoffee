-- AlterTable Product
ALTER TABLE "Product" ADD COLUMN "ifoodExternalCode" TEXT;

-- AlterTable Order
ALTER TABLE "Order" ADD COLUMN "source" TEXT NOT NULL DEFAULT 'INTERNAL';
ALTER TABLE "Order" ADD COLUMN "externalId" TEXT;

-- CreateIndex
CREATE INDEX "Product_companyUuid_ifoodExternalCode_idx" ON "Product"("companyUuid", "ifoodExternalCode");

-- CreateIndex
CREATE INDEX "Order_source_idx" ON "Order"("source");

-- CreateIndex (PostgreSQL: multiple NULLs in unique are allowed)
CREATE UNIQUE INDEX "Order_source_externalId_key" ON "Order"("source", "externalId");

-- CreateTable
CREATE TABLE "IfoodIntegration" (
    "uuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "merchantId" TEXT,
    "clientId" TEXT,
    "clientSecret" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "tokenExpiresAt" TIMESTAMP(3),
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "webhookSecret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IfoodIntegration_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "IfoodIntegration_companyUuid_key" ON "IfoodIntegration"("companyUuid");

-- CreateIndex
CREATE INDEX "IfoodIntegration_merchantId_idx" ON "IfoodIntegration"("merchantId");
