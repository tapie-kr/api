/*
  Warnings:

  - Changed the type of `studentID` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "studentID",
ADD COLUMN     "studentID" INTEGER NOT NULL;
