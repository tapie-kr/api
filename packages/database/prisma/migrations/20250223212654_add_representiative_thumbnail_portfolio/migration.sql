/*
  Warnings:

  - Added the required column `previewThumbnailUUID` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `representativeThumbnail` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "previewThumbnailUUID" TEXT NOT NULL,
ADD COLUMN     "representativeThumbnail" INTEGER NOT NULL;
