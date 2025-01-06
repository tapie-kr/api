/*
  Warnings:

  - You are about to drop the column `accountUUID` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `accountUUID` on the `PortfolioMember` table. All the data in the column will be lost.
  - You are about to drop the column `accountUUID` on the `ProfileVisitStat` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccountHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccountSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountAward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountSkillToPortfolioMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[memberUUID]` on the table `ApplyForm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[portfolioUUID,memberUUID]` on the table `PortfolioMember` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `unit` on the `ApplyForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MemberUnit" AS ENUM ('Developer', 'Designer');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('Admin', 'Manager', 'Member');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_profileAssetUUID_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_representativeAwardUUID_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_representativePortfolioMemberUUID_fkey";

-- DropForeignKey
ALTER TABLE "AccountHistory" DROP CONSTRAINT "AccountHistory_accountUUID_fkey";

-- DropForeignKey
ALTER TABLE "AccountSkill" DROP CONSTRAINT "AccountSkill_accountUUID_fkey";

-- DropForeignKey
ALTER TABLE "AccountSkill" DROP CONSTRAINT "AccountSkill_skillUUID_fkey";

-- DropForeignKey
ALTER TABLE "ApplyForm" DROP CONSTRAINT "ApplyForm_accountUUID_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioMember" DROP CONSTRAINT "PortfolioMember_accountUUID_fkey";

-- DropForeignKey
ALTER TABLE "ProfileVisitStat" DROP CONSTRAINT "ProfileVisitStat_accountUUID_fkey";

-- DropForeignKey
ALTER TABLE "_AccountAward" DROP CONSTRAINT "_AccountAward_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountAward" DROP CONSTRAINT "_AccountAward_B_fkey";

-- DropForeignKey
ALTER TABLE "_AccountSkillToPortfolioMember" DROP CONSTRAINT "_AccountSkillToPortfolioMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountSkillToPortfolioMember" DROP CONSTRAINT "_AccountSkillToPortfolioMember_B_fkey";

-- DropIndex
DROP INDEX "ApplyForm_accountUUID_key";

-- DropIndex
DROP INDEX "PortfolioMember_portfolioUUID_accountUUID_key";

-- AlterTable
ALTER TABLE "ApplyForm" DROP COLUMN "accountUUID",
ADD COLUMN     "memberUUID" TEXT,
DROP COLUMN "unit",
ADD COLUMN     "unit" "MemberUnit" NOT NULL;

-- AlterTable
ALTER TABLE "PortfolioMember" DROP COLUMN "accountUUID",
ADD COLUMN     "memberUUID" TEXT;

-- AlterTable
ALTER TABLE "ProfileVisitStat" DROP COLUMN "accountUUID",
ADD COLUMN     "memberUUID" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "AccountHistory";

-- DropTable
DROP TABLE "AccountSkill";

-- DropTable
DROP TABLE "_AccountAward";

-- DropTable
DROP TABLE "_AccountSkillToPortfolioMember";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Unit";

-- CreateTable
CREATE TABLE "Member" (
    "uuid" TEXT NOT NULL,
    "profileAssetUUID" TEXT,
    "representativePortfolioMemberUUID" TEXT,
    "representativeAwardUUID" TEXT,
    "username" TEXT,
    "googleEmail" TEXT NOT NULL,
    "role" "MemberRole" NOT NULL DEFAULT 'Member',
    "name" TEXT NOT NULL,
    "unit" "MemberUnit" NOT NULL,
    "additionalTitle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "MemberSkill" (
    "uuid" TEXT NOT NULL,
    "memberUUID" TEXT NOT NULL,
    "skillUUID" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isLearning" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberSkill_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "MemberHistory" (
    "id" SERIAL NOT NULL,
    "memberUUID" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "releasedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberAward" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MemberAward_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MemberSkillToPortfolioMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MemberSkillToPortfolioMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_representativePortfolioMemberUUID_key" ON "Member"("representativePortfolioMemberUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Member_username_key" ON "Member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member_googleEmail_key" ON "Member"("googleEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Member_name_additionalTitle_key" ON "Member"("name", "additionalTitle");

-- CreateIndex
CREATE UNIQUE INDEX "MemberSkill_memberUUID_skillUUID_key" ON "MemberSkill"("memberUUID", "skillUUID");

-- CreateIndex
CREATE UNIQUE INDEX "MemberHistory_memberUUID_label_key" ON "MemberHistory"("memberUUID", "label");

-- CreateIndex
CREATE INDEX "_MemberAward_B_index" ON "_MemberAward"("B");

-- CreateIndex
CREATE INDEX "_MemberSkillToPortfolioMember_B_index" ON "_MemberSkillToPortfolioMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ApplyForm_memberUUID_key" ON "ApplyForm"("memberUUID");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioMember_portfolioUUID_memberUUID_key" ON "PortfolioMember"("portfolioUUID", "memberUUID");

-- AddForeignKey
ALTER TABLE "ApplyForm" ADD CONSTRAINT "ApplyForm_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_profileAssetUUID_fkey" FOREIGN KEY ("profileAssetUUID") REFERENCES "Asset"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_representativePortfolioMemberUUID_fkey" FOREIGN KEY ("representativePortfolioMemberUUID") REFERENCES "PortfolioMember"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_representativeAwardUUID_fkey" FOREIGN KEY ("representativeAwardUUID") REFERENCES "Award"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberSkill" ADD CONSTRAINT "MemberSkill_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberSkill" ADD CONSTRAINT "MemberSkill_skillUUID_fkey" FOREIGN KEY ("skillUUID") REFERENCES "Skill"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberHistory" ADD CONSTRAINT "MemberHistory_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioMember" ADD CONSTRAINT "PortfolioMember_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileVisitStat" ADD CONSTRAINT "ProfileVisitStat_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberAward" ADD CONSTRAINT "_MemberAward_A_fkey" FOREIGN KEY ("A") REFERENCES "Award"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberAward" ADD CONSTRAINT "_MemberAward_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberSkillToPortfolioMember" ADD CONSTRAINT "_MemberSkillToPortfolioMember_A_fkey" FOREIGN KEY ("A") REFERENCES "MemberSkill"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberSkillToPortfolioMember" ADD CONSTRAINT "_MemberSkillToPortfolioMember_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioMember"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
