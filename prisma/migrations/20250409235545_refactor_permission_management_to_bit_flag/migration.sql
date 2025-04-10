/*
  Warnings:

  - You are about to drop the column `account` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `announcement` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `assignment` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `auditLog` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `award` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `classroom` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `interview` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `statistics` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `survey` on the `Permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "account",
DROP COLUMN "announcement",
DROP COLUMN "assignment",
DROP COLUMN "auditLog",
DROP COLUMN "award",
DROP COLUMN "class",
DROP COLUMN "classroom",
DROP COLUMN "interview",
DROP COLUMN "project",
DROP COLUMN "statistics",
DROP COLUMN "survey",
ADD COLUMN     "flags" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "PermissionType";
