/*
  Warnings:

  - You are about to drop the column `unit` on the `FormResponse` table. All the data in the column will be lost.
  - Added the required column `unit` to the `ApplyForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplyForm" ADD COLUMN     "unit" "MemberUnit" NOT NULL;

-- AlterTable
ALTER TABLE "FormResponse" DROP COLUMN "unit";
