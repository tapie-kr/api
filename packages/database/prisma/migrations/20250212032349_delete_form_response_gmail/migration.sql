/*
  Warnings:

  - You are about to drop the column `googleEmail` on the `FormResponse` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "FormResponse_googleEmail_key";

-- AlterTable
ALTER TABLE "FormResponse" DROP COLUMN "googleEmail";
