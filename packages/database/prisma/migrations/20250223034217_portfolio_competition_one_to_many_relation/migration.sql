/*
  Warnings:

  - You are about to drop the `_CompetitionToPortfolio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompetitionToPortfolio" DROP CONSTRAINT "_CompetitionToPortfolio_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompetitionToPortfolio" DROP CONSTRAINT "_CompetitionToPortfolio_B_fkey";

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "competitionUUID" TEXT;

-- DropTable
DROP TABLE "_CompetitionToPortfolio";

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_competitionUUID_fkey" FOREIGN KEY ("competitionUUID") REFERENCES "Competition"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
