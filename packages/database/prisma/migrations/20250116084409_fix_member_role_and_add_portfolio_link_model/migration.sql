/*
  Warnings:

  - The values [ADMIN] on the enum `MemberRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `additionalTitle` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `MemberProfile` table. All the data in the column will be lost.
  - You are about to drop the column `links` on the `Portfolio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label,href]` on the table `MemberProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `href` to the `MemberProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PortfolioLinkType" AS ENUM ('LANDING', 'GITHUB');

-- AlterEnum
BEGIN;
CREATE TYPE "MemberRole_new" AS ENUM ('MANAGER', 'VICE_MANAGER', 'MEMBER');
ALTER TABLE "Member" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Member" ALTER COLUMN "role" TYPE "MemberRole_new" USING ("role"::text::"MemberRole_new");
ALTER TYPE "MemberRole" RENAME TO "MemberRole_old";
ALTER TYPE "MemberRole_new" RENAME TO "MemberRole";
DROP TYPE "MemberRole_old";
ALTER TABLE "Member" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- DropIndex
DROP INDEX "Member_name_additionalTitle_key";

-- DropIndex
DROP INDEX "MemberProfile_label_link_key";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "additionalTitle";

-- AlterTable
ALTER TABLE "MemberProfile" DROP COLUMN "link",
ADD COLUMN     "href" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "links",
ADD COLUMN     "thumbnailEffectColor" TEXT;

-- CreateTable
CREATE TABLE "PortfolioLink" (
    "uuid" TEXT NOT NULL,
    "portfolioUUID" TEXT NOT NULL,
    "type" "PortfolioLinkType" NOT NULL,
    "href" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioLink_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberProfile_label_href_key" ON "MemberProfile"("label", "href");

-- AddForeignKey
ALTER TABLE "PortfolioLink" ADD CONSTRAINT "PortfolioLink_portfolioUUID_fkey" FOREIGN KEY ("portfolioUUID") REFERENCES "Portfolio"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
