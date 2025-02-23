/*
  Warnings:

  - A unique constraint covering the columns `[fingerprint]` on the table `PortfolioDownloadStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fingerprint]` on the table `PortfolioVisitStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fingerprint]` on the table `ProfileVisitStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fingerprint]` on the table `SiteVisitStat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fingerprint` to the `PortfolioDownloadStat` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `PortfolioMember` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fingerprint` to the `PortfolioVisitStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fingerprint` to the `ProfileVisitStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fingerprint` to the `SiteVisitStat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_thumbnailUUID_fkey";

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "portfolioUuid" TEXT;

-- AlterTable
ALTER TABLE "PortfolioDownloadStat" ADD COLUMN     "fingerprint" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PortfolioMember" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "PortfolioVisitStat" ADD COLUMN     "fingerprint" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfileVisitStat" ADD COLUMN     "fingerprint" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SiteVisitStat" ADD COLUMN     "fingerprint" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioDownloadStat_fingerprint_key" ON "PortfolioDownloadStat"("fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioVisitStat_fingerprint_key" ON "PortfolioVisitStat"("fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileVisitStat_fingerprint_key" ON "ProfileVisitStat"("fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "SiteVisitStat_fingerprint_key" ON "SiteVisitStat"("fingerprint");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_portfolioUuid_fkey" FOREIGN KEY ("portfolioUuid") REFERENCES "Portfolio"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
