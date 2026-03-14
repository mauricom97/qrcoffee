-- CreateTable
CREATE TABLE "Order" (
    "uuid" TEXT NOT NULL,
    "tableUuid" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "uuid" TEXT NOT NULL,
    "orderUuid" TEXT NOT NULL,
    "productUuid" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "Order_tableUuid_idx" ON "Order"("tableUuid");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "OrderItem_orderUuid_idx" ON "OrderItem"("orderUuid");

-- CreateIndex
CREATE INDEX "OrderItem_productUuid_idx" ON "OrderItem"("productUuid");
