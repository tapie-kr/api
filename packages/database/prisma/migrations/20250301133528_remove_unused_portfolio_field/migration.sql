/*
  Warnings:

  - You are about to drop the column `previewThumbnailUUID` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUUID` on the `Portfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "previewThumbnailUUID",
DROP COLUMN "thumbnailUUID";
