/*
  Warnings:

  - You are about to drop the column `memberUUID` on the `PortfolioMember` table. All the data in the column will be lost.
  - You are about to drop the column `fingerprintUUID` on the `PortfolioVisitStat` table. All the data in the column will be lost.
  - You are about to drop the column `fingerprintUUID` on the `SiteVisitStat` table. All the data in the column will be lost.
  - You are about to drop the `Fingerprint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountToAward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PortfolioToPortfolioMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[representativePortfolioMemberUUID]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,additionalTitle]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleEmail]` on the table `ApplyForm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `ApplyForm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[competitionUUID,title]` on the table `Award` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,grade]` on the table `Award` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[grade,gradeLabel]` on the table `Award` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,releasedAt]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[portfolioUUID,accountUUID]` on the table `PortfolioMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `competitionUUID` to the `Award` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewardedAt` to the `Award` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioUUID` to the `PortfolioMember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PortfolioTag" AS ENUM ('Web', 'App', 'Design', 'Hackathon', 'Winner', 'Entry', 'Other');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('Development', 'Management', 'Other');

-- DropForeignKey
ALTER TABLE "PortfolioMember" DROP CONSTRAINT "PortfolioMember_memberUUID_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioVisitStat" DROP CONSTRAINT "PortfolioVisitStat_fingerprintUUID_fkey";

-- DropForeignKey
ALTER TABLE "SiteVisitStat" DROP CONSTRAINT "SiteVisitStat_fingerprintUUID_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToAward" DROP CONSTRAINT "_AccountToAward_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToAward" DROP CONSTRAINT "_AccountToAward_B_fkey";

-- DropForeignKey
ALTER TABLE "_PortfolioToPortfolioMember" DROP CONSTRAINT "_PortfolioToPortfolioMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_PortfolioToPortfolioMember" DROP CONSTRAINT "_PortfolioToPortfolioMember_B_fkey";

-- DropIndex
DROP INDEX "PortfolioMember_memberUUID_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "additionalTitle" TEXT,
ADD COLUMN     "representativeAwardUUID" TEXT,
ADD COLUMN     "representativePortfolioMemberUUID" TEXT;

-- AlterTable
ALTER TABLE "Award" ADD COLUMN     "competitionUUID" TEXT NOT NULL,
ADD COLUMN     "gradeLabel" TEXT,
ADD COLUMN     "rewardedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "tags" "PortfolioTag"[];

-- AlterTable
ALTER TABLE "PortfolioMember" DROP COLUMN "memberUUID",
ADD COLUMN     "accountUUID" TEXT,
ADD COLUMN     "portfolioUUID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PortfolioVisitStat" DROP COLUMN "fingerprintUUID";

-- AlterTable
ALTER TABLE "SiteVisitStat" DROP COLUMN "fingerprintUUID";

-- DropTable
DROP TABLE "Fingerprint";

-- DropTable
DROP TABLE "_AccountToAward";

-- DropTable
DROP TABLE "_PortfolioToPortfolioMember";

-- CreateTable
CREATE TABLE "AccountSkill" (
    "uuid" TEXT NOT NULL,
    "accountUUID" TEXT NOT NULL,
    "skillUUID" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isLearning" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountSkill_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "AccountHistory" (
    "id" SERIAL NOT NULL,
    "accountUUID" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "releasedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Skill" (
    "uuid" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SkillType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PortfolioDownloadStat" (
    "id" SERIAL NOT NULL,
    "portfolioUUID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioDownloadStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileVisitStat" (
    "id" SERIAL NOT NULL,
    "accountUUID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileVisitStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountAward" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AccountAward_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AccountSkillToPortfolioMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AccountSkillToPortfolioMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CompetitionToPortfolio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompetitionToPortfolio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountSkill_accountUUID_skillUUID_key" ON "AccountSkill"("accountUUID", "skillUUID");

-- CreateIndex
CREATE UNIQUE INDEX "AccountHistory_accountUUID_label_key" ON "AccountHistory"("accountUUID", "label");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_name_key" ON "Competition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_icon_name_key" ON "Skill"("icon", "name");

-- CreateIndex
CREATE INDEX "_AccountAward_B_index" ON "_AccountAward"("B");

-- CreateIndex
CREATE INDEX "_AccountSkillToPortfolioMember_B_index" ON "_AccountSkillToPortfolioMember"("B");

-- CreateIndex
CREATE INDEX "_CompetitionToPortfolio_B_index" ON "_CompetitionToPortfolio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Account_representativePortfolioMemberUUID_key" ON "Account"("representativePortfolioMemberUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_additionalTitle_key" ON "Account"("name", "additionalTitle");

-- CreateIndex
CREATE UNIQUE INDEX "ApplyForm_googleEmail_key" ON "ApplyForm"("googleEmail");

-- CreateIndex
CREATE UNIQUE INDEX "ApplyForm_phoneNumber_key" ON "ApplyForm"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Award_competitionUUID_title_key" ON "Award"("competitionUUID", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Award_title_grade_key" ON "Award"("title", "grade");

-- CreateIndex
CREATE UNIQUE INDEX "Award_grade_gradeLabel_key" ON "Award"("grade", "gradeLabel");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_name_releasedAt_key" ON "Portfolio"("name", "releasedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioMember_portfolioUUID_accountUUID_key" ON "PortfolioMember"("portfolioUUID", "accountUUID");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_representativePortfolioMemberUUID_fkey" FOREIGN KEY ("representativePortfolioMemberUUID") REFERENCES "PortfolioMember"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_representativeAwardUUID_fkey" FOREIGN KEY ("representativeAwardUUID") REFERENCES "Award"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountSkill" ADD CONSTRAINT "AccountSkill_accountUUID_fkey" FOREIGN KEY ("accountUUID") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountSkill" ADD CONSTRAINT "AccountSkill_skillUUID_fkey" FOREIGN KEY ("skillUUID") REFERENCES "Skill"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountHistory" ADD CONSTRAINT "AccountHistory_accountUUID_fkey" FOREIGN KEY ("accountUUID") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_competitionUUID_fkey" FOREIGN KEY ("competitionUUID") REFERENCES "Competition"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioMember" ADD CONSTRAINT "PortfolioMember_portfolioUUID_fkey" FOREIGN KEY ("portfolioUUID") REFERENCES "Portfolio"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioMember" ADD CONSTRAINT "PortfolioMember_accountUUID_fkey" FOREIGN KEY ("accountUUID") REFERENCES "Account"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioDownloadStat" ADD CONSTRAINT "PortfolioDownloadStat_portfolioUUID_fkey" FOREIGN KEY ("portfolioUUID") REFERENCES "Portfolio"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileVisitStat" ADD CONSTRAINT "ProfileVisitStat_accountUUID_fkey" FOREIGN KEY ("accountUUID") REFERENCES "Account"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountAward" ADD CONSTRAINT "_AccountAward_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountAward" ADD CONSTRAINT "_AccountAward_B_fkey" FOREIGN KEY ("B") REFERENCES "Award"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountSkillToPortfolioMember" ADD CONSTRAINT "_AccountSkillToPortfolioMember_A_fkey" FOREIGN KEY ("A") REFERENCES "AccountSkill"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountSkillToPortfolioMember" ADD CONSTRAINT "_AccountSkillToPortfolioMember_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioMember"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetitionToPortfolio" ADD CONSTRAINT "_CompetitionToPortfolio_A_fkey" FOREIGN KEY ("A") REFERENCES "Competition"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetitionToPortfolio" ADD CONSTRAINT "_CompetitionToPortfolio_B_fkey" FOREIGN KEY ("B") REFERENCES "Portfolio"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
