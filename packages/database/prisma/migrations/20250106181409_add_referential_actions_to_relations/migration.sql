-- DropForeignKey
ALTER TABLE "ApplyForm" DROP CONSTRAINT "ApplyForm_portfolioAssetUUID_fkey";

-- DropForeignKey
ALTER TABLE "Award" DROP CONSTRAINT "Award_competitionUUID_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_profileAssetUUID_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_representativeAwardUUID_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_representativePortfolioMemberUUID_fkey";

-- DropForeignKey
ALTER TABLE "MemberHistory" DROP CONSTRAINT "MemberHistory_memberUUID_fkey";

-- DropForeignKey
ALTER TABLE "MemberSkill" DROP CONSTRAINT "MemberSkill_memberUUID_fkey";

-- DropForeignKey
ALTER TABLE "MemberSkill" DROP CONSTRAINT "MemberSkill_skillUUID_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_presentationUUID_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_thumbnailUUID_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioMember" DROP CONSTRAINT "PortfolioMember_portfolioUUID_fkey";

-- AlterTable
ALTER TABLE "Award" ALTER COLUMN "competitionUUID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_competitionUUID_fkey" FOREIGN KEY ("competitionUUID") REFERENCES "Competition"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplyForm" ADD CONSTRAINT "ApplyForm_portfolioAssetUUID_fkey" FOREIGN KEY ("portfolioAssetUUID") REFERENCES "Asset"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_profileAssetUUID_fkey" FOREIGN KEY ("profileAssetUUID") REFERENCES "Asset"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_representativePortfolioMemberUUID_fkey" FOREIGN KEY ("representativePortfolioMemberUUID") REFERENCES "PortfolioMember"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_representativeAwardUUID_fkey" FOREIGN KEY ("representativeAwardUUID") REFERENCES "Award"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberSkill" ADD CONSTRAINT "MemberSkill_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberSkill" ADD CONSTRAINT "MemberSkill_skillUUID_fkey" FOREIGN KEY ("skillUUID") REFERENCES "Skill"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberHistory" ADD CONSTRAINT "MemberHistory_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_thumbnailUUID_fkey" FOREIGN KEY ("thumbnailUUID") REFERENCES "Asset"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_presentationUUID_fkey" FOREIGN KEY ("presentationUUID") REFERENCES "Asset"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioMember" ADD CONSTRAINT "PortfolioMember_portfolioUUID_fkey" FOREIGN KEY ("portfolioUUID") REFERENCES "Portfolio"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
