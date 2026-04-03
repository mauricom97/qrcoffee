-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STAFF');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'STAFF';

-- Usuários existentes passam a ser administradores (comportamento anterior implícito)
UPDATE "User" SET "role" = 'ADMIN';

-- CreateTable
CREATE TABLE "UserGroup" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserGroupMember" (
    "userUuid" TEXT NOT NULL,
    "groupUuid" TEXT NOT NULL,

    CONSTRAINT "UserGroupMember_pkey" PRIMARY KEY ("userUuid","groupUuid")
);

-- CreateIndex
CREATE INDEX "UserGroup_companyUuid_idx" ON "UserGroup"("companyUuid");

-- CreateIndex
CREATE INDEX "UserGroupMember_groupUuid_idx" ON "UserGroupMember"("groupUuid");
