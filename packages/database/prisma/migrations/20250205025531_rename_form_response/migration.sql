/*
  Warnings:

  - You are about to drop the column `assetUuid` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `applyFormId` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[formResponseUUID]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ApplyForm" DROP CONSTRAINT "ApplyForm_assetUuid_fkey";

-- DropForeignKey
ALTER TABLE "FormResponse" DROP CONSTRAINT "FormResponse_memberUUID_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_applyFormId_fkey";

-- AlterTable
ALTER TABLE "ApplyForm" DROP COLUMN "assetUuid";

-- AlterTable
ALTER TABLE "FormResponse" ADD COLUMN     "memberUuid" TEXT;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "applyFormId",
ADD COLUMN     "formResponseUUID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Member_formResponseUUID_key" ON "Member"("formResponseUUID");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_formResponseUUID_fkey" FOREIGN KEY ("formResponseUUID") REFERENCES "FormResponse"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
