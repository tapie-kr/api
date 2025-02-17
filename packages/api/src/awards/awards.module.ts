import { Module } from '@nestjs/common';
import { AwardsPrivateController } from '@/awards/controllers/awards.private.controller';
import { AwardsPublicController } from '@/awards/controllers/awards.public.controller';
import { AwardRepository } from '@/awards/repository/award.repository';
import { CompetitionRepository } from '@/awards/repository/competition.repository';
import { AwardsService } from '@/awards/service/awards.service';
import { PrismaService } from '@/common/prisma/prisma.service';

@Module({
  imports:     [],
  controllers: [AwardsPublicController, AwardsPrivateController],
  providers:   [
    AwardRepository,
    CompetitionRepository,
    AwardsService,
    PrismaService,
  ],
  exports: [],
})
export class AwardsModule {
}
