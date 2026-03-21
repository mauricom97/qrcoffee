-- CreateTable
CREATE TABLE "CashierSession" (
    "uuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "openingBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "closingBalance" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "CashierSession_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CashierMovement" (
    "uuid" TEXT NOT NULL,
    "sessionUuid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CashierMovement_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "CashierSession_companyUuid_idx" ON "CashierSession"("companyUuid");

-- CreateIndex
CREATE INDEX "CashierSession_status_idx" ON "CashierSession"("status");

-- CreateIndex
CREATE INDEX "CashierMovement_sessionUuid_idx" ON "CashierMovement"("sessionUuid");

-- AddForeignKey
ALTER TABLE "CashierSession" ADD CONSTRAINT "CashierSession_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "Company"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashierMovement" ADD CONSTRAINT "CashierMovement_sessionUuid_fkey" FOREIGN KEY ("sessionUuid") REFERENCES "CashierSession"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
