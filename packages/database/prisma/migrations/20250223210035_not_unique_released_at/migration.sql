/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Portfolio_name_releasedAt_key";

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_name_key" ON "Portfolio"("name");
