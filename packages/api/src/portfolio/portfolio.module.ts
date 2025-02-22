import { Module } from '@nestjs/common';
import { AssetModule } from '@/asset/asset.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { MembersModule } from '@/members/members.module';
import { MembersService } from '@/members/service/members.service';
import { PortfolioPrivateController } from '@/portfolio/controllers/portfolio.private.controller';
import { PortfolioPublicController } from '@/portfolio/controllers/portfolio.public.controller';
import { AwardRepository } from '@/portfolio/repository/award.repository';
import { CompetitionRepository } from '@/portfolio/repository/competition.repository';
import { PortfolioService } from '@/portfolio/service/portfolio.service';

@Module({
  imports:     [MembersModule, AssetModule],
  controllers: [PortfolioPublicController, PortfolioPrivateController],
  providers:   [
    MembersService,
    AwardRepository,
    CompetitionRepository,
    PortfolioService,
    PrismaService,
  ],
  exports: [],
})
export class PortfolioModule {
}
