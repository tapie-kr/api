/*
  Warnings:

  - You are about to drop the `PortfolioDownloadStat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PortfolioVisitStat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileVisitStat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SiteVisitStat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studentID` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PortfolioDownloadStat" DROP CONSTRAINT "PortfolioDownloadStat_portfolioUUID_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioVisitStat" DROP CONSTRAINT "PortfolioVisitStat_portfolioUUID_fkey";

-- DropForeignKey
ALTER TABLE "ProfileVisitStat" DROP CONSTRAINT "ProfileVisitStat_memberUUID_fkey";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "studentID" TEXT NOT NULL,
ADD COLUMN     "visitStats" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "downloadStats" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "visitStats" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "PortfolioDownloadStat";

-- DropTable
DROP TABLE "PortfolioVisitStat";

-- DropTable
DROP TABLE "ProfileVisitStat";

-- DropTable
DROP TABLE "SiteVisitStat";

-- DropEnum
DROP TYPE "SiteType";
