/*
  Warnings:

  - The values [Admin,Manager,Member] on the enum `MemberRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [Developer,Designer] on the enum `MemberUnit` will be removed. If these variants are still used in the database, this will fail.
  - The values [Web,App,Design,Hackathon,Winner,Entry,Other] on the enum `PortfolioTag` will be removed. If these variants are still used in the database, this will fail.
  - The values [Tapie,Inspire,ApplyForm,Portfolio] on the enum `SiteType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Development,Management,Other] on the enum `SkillType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MemberRole_new" AS ENUM ('ADMIN', 'MANAGER', 'MEMBER');
ALTER TABLE "Member" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Member" ALTER COLUMN "role" TYPE "MemberRole_new" USING ("role"::text::"MemberRole_new");
ALTER TYPE "MemberRole" RENAME TO "MemberRole_old";
ALTER TYPE "MemberRole_new" RENAME TO "MemberRole";
DROP TYPE "MemberRole_old";
ALTER TABLE "Member" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MemberUnit_new" AS ENUM ('DEVELOPER', 'DESIGNER');
ALTER TABLE "ApplyForm" ALTER COLUMN "unit" TYPE "MemberUnit_new" USING ("unit"::text::"MemberUnit_new");
ALTER TABLE "Member" ALTER COLUMN "unit" TYPE "MemberUnit_new" USING ("unit"::text::"MemberUnit_new");
ALTER TYPE "MemberUnit" RENAME TO "MemberUnit_old";
ALTER TYPE "MemberUnit_new" RENAME TO "MemberUnit";
DROP TYPE "MemberUnit_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PortfolioTag_new" AS ENUM ('WEB', 'APP', 'DESIGN', 'HACKATHON', 'WINNER', 'ENTRY', 'OTHER');
ALTER TABLE "Portfolio" ALTER COLUMN "tags" TYPE "PortfolioTag_new"[] USING ("tags"::text::"PortfolioTag_new"[]);
ALTER TYPE "PortfolioTag" RENAME TO "PortfolioTag_old";
ALTER TYPE "PortfolioTag_new" RENAME TO "PortfolioTag";
DROP TYPE "PortfolioTag_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SiteType_new" AS ENUM ('TAPIE', 'INSPIRE', 'APPLY_FORM', 'PORTFOLIO');
ALTER TABLE "SiteVisitStat" ALTER COLUMN "type" TYPE "SiteType_new" USING ("type"::text::"SiteType_new");
ALTER TYPE "SiteType" RENAME TO "SiteType_old";
ALTER TYPE "SiteType_new" RENAME TO "SiteType";
DROP TYPE "SiteType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SkillType_new" AS ENUM ('DEVELOPMENT', 'MANAGEMENT', 'OTHER');
ALTER TABLE "Skill" ALTER COLUMN "type" TYPE "SkillType_new" USING ("type"::text::"SkillType_new");
ALTER TYPE "SkillType" RENAME TO "SkillType_old";
ALTER TYPE "SkillType_new" RENAME TO "SkillType";
DROP TYPE "SkillType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
