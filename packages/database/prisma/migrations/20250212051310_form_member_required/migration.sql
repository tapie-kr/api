/*
  Warnings:

  - Made the column `memberUUID` on table `FormResponse` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FormResponse" ALTER COLUMN "memberUUID" SET NOT NULL;
