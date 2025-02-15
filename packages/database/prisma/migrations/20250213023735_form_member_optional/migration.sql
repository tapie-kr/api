/*
  Warnings:

  - Added the required column `googleEmail` to the `FormResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `FormResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormResponse" ADD COLUMN     "googleEmail" TEXT NOT NULL,
ADD COLUMN     "studentId" TEXT NOT NULL,
ALTER COLUMN "memberUUID" DROP NOT NULL;
