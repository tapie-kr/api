/*
  Warnings:

  - The primary key for the `ApplyForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expectedActivities` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `googleEmail` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `introduction` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `memberUUID` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `motivation` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioAssetUUID` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `reasonToChoose` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the `MemberProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endsAt` to the `ApplyForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `ApplyForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApplyForm" DROP CONSTRAINT "ApplyForm_memberUUID_fkey";

-- DropForeignKey
ALTER TABLE "ApplyForm" DROP CONSTRAINT "ApplyForm_portfolioAssetUUID_fkey";

-- DropForeignKey
ALTER TABLE "MemberProfile" DROP CONSTRAINT "MemberProfile_memberUUID_fkey";

-- DropIndex
DROP INDEX "ApplyForm_googleEmail_key";

-- DropIndex
DROP INDEX "ApplyForm_memberUUID_key";

-- DropIndex
DROP INDEX "ApplyForm_phoneNumber_key";

-- DropIndex
DROP INDEX "ApplyForm_portfolioAssetUUID_key";

-- AlterTable
ALTER TABLE "ApplyForm" DROP CONSTRAINT "ApplyForm_pkey",
DROP COLUMN "expectedActivities",
DROP COLUMN "googleEmail",
DROP COLUMN "introduction",
DROP COLUMN "memberUUID",
DROP COLUMN "motivation",
DROP COLUMN "phoneNumber",
DROP COLUMN "portfolioAssetUUID",
DROP COLUMN "reasonToChoose",
DROP COLUMN "unit",
DROP COLUMN "updatedAt",
DROP COLUMN "uuid",
ADD COLUMN     "assetUuid" TEXT,
ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "ApplyForm_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "applyFormId" INTEGER;

-- DropTable
DROP TABLE "MemberProfile";

-- CreateTable
CREATE TABLE "FormResponse" (
    "uuid" TEXT NOT NULL,
    "formId" INTEGER NOT NULL,
    "memberUUID" TEXT,
    "portfolioAssetUUID" TEXT,
    "name" TEXT NOT NULL,
    "unit" "MemberUnit" NOT NULL,
    "googleEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "expectedActivities" TEXT NOT NULL,
    "reasonToChoose" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "MemberLink" (
    "id" SERIAL NOT NULL,
    "memberUUID" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormResponse_memberUUID_key" ON "FormResponse"("memberUUID");

-- CreateIndex
CREATE UNIQUE INDEX "FormResponse_portfolioAssetUUID_key" ON "FormResponse"("portfolioAssetUUID");

-- CreateIndex
CREATE UNIQUE INDEX "FormResponse_googleEmail_key" ON "FormResponse"("googleEmail");

-- CreateIndex
CREATE UNIQUE INDEX "FormResponse_phoneNumber_key" ON "FormResponse"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "MemberLink_memberUUID_label_key" ON "MemberLink"("memberUUID", "label");

-- CreateIndex
CREATE UNIQUE INDEX "MemberLink_label_href_key" ON "MemberLink"("label", "href");

-- AddForeignKey
ALTER TABLE "ApplyForm" ADD CONSTRAINT "ApplyForm_assetUuid_fkey" FOREIGN KEY ("assetUuid") REFERENCES "Asset"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "ApplyForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_portfolioAssetUUID_fkey" FOREIGN KEY ("portfolioAssetUUID") REFERENCES "Asset"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_applyFormId_fkey" FOREIGN KEY ("applyFormId") REFERENCES "ApplyForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberLink" ADD CONSTRAINT "MemberLink_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
