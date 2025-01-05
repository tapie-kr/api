-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('Developer', 'Designer');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Manager', 'Member');

-- CreateEnum
CREATE TYPE "SiteType" AS ENUM ('Tapie', 'Inspire', 'ApplyForm', 'Portfolio');

-- CreateTable
CREATE TABLE "Account" (
    "uuid" TEXT NOT NULL,
    "profileAssetUUID" TEXT,
    "username" TEXT,
    "googleEmail" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Member',
    "name" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Award" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "grade" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "uuid" TEXT NOT NULL,
    "thumbnailUUID" TEXT,
    "presentationUUID" TEXT,
    "name" TEXT NOT NULL,
    "catchPhrase" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "links" TEXT[],
    "releasedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PortfolioMember" (
    "uuid" TEXT NOT NULL,
    "memberUUID" TEXT,
    "name" TEXT,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioMember_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Asset" (
    "uuid" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ApplyForm" (
    "uuid" TEXT NOT NULL,
    "accountUUID" TEXT,
    "portfolioAssetUUID" TEXT,
    "name" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,
    "googleEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "expectedActivities" TEXT NOT NULL,
    "reasonToChoose" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplyForm_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Fingerprint" (
    "uuid" TEXT NOT NULL,
    "userAgent" TEXT,
    "platform" TEXT,
    "isMobile" BOOLEAN,
    "deviceMemory" DOUBLE PRECISION,
    "referer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fingerprint_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SiteVisitStat" (
    "id" SERIAL NOT NULL,
    "fingerprintUUID" TEXT,
    "type" "SiteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteVisitStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioVisitStat" (
    "id" SERIAL NOT NULL,
    "portfolioUUID" TEXT,
    "fingerprintUUID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioVisitStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToAward" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AccountToAward_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PortfolioToPortfolioMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PortfolioToPortfolioMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_googleEmail_key" ON "Account"("googleEmail");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioMember_memberUUID_key" ON "PortfolioMember"("memberUUID");

-- CreateIndex
CREATE UNIQUE INDEX "ApplyForm_accountUUID_key" ON "ApplyForm"("accountUUID");

-- CreateIndex
CREATE UNIQUE INDEX "ApplyForm_portfolioAssetUUID_key" ON "ApplyForm"("portfolioAssetUUID");

-- CreateIndex
CREATE INDEX "_AccountToAward_B_index" ON "_AccountToAward"("B");

-- CreateIndex
CREATE INDEX "_PortfolioToPortfolioMember_B_index" ON "_PortfolioToPortfolioMember"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_profileAssetUUID_fkey" FOREIGN KEY ("profileAssetUUID") REFERENCES "Asset"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_thumbnailUUID_fkey" FOREIGN KEY ("thumbnailUUID") REFERENCES "Asset"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_presentationUUID_fkey" FOREIGN KEY ("presentationUUID") REFERENCES "Asset"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioMember" ADD CONSTRAINT "PortfolioMember_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Account"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplyForm" ADD CONSTRAINT "ApplyForm_accountUUID_fkey" FOREIGN KEY ("accountUUID") REFERENCES "Account"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplyForm" ADD CONSTRAINT "ApplyForm_portfolioAssetUUID_fkey" FOREIGN KEY ("portfolioAssetUUID") REFERENCES "Asset"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteVisitStat" ADD CONSTRAINT "SiteVisitStat_fingerprintUUID_fkey" FOREIGN KEY ("fingerprintUUID") REFERENCES "Fingerprint"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioVisitStat" ADD CONSTRAINT "PortfolioVisitStat_portfolioUUID_fkey" FOREIGN KEY ("portfolioUUID") REFERENCES "Portfolio"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioVisitStat" ADD CONSTRAINT "PortfolioVisitStat_fingerprintUUID_fkey" FOREIGN KEY ("fingerprintUUID") REFERENCES "Fingerprint"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToAward" ADD CONSTRAINT "_AccountToAward_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToAward" ADD CONSTRAINT "_AccountToAward_B_fkey" FOREIGN KEY ("B") REFERENCES "Award"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToPortfolioMember" ADD CONSTRAINT "_PortfolioToPortfolioMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Portfolio"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToPortfolioMember" ADD CONSTRAINT "_PortfolioToPortfolioMember_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioMember"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
