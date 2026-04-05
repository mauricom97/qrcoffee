-- CreateTable
CREATE TABLE "ProductAddon" (
    "uuid" TEXT NOT NULL,
    "productUuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extraPrice" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductAddon_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "ProductAddon_productUuid_idx" ON "ProductAddon"("productUuid");

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN "addonsSnapshot" JSONB;
