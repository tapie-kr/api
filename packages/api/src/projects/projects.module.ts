import { Module } from '@nestjs/common';
import { AssetModule } from '@/asset/asset.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { MembersModule } from '@/members/members.module';
import { MembersService } from '@/members/service/members.service';
import { CompetitionRepository } from '@/portfolio/repository/competition.repository';
import { ProjectPrivateController } from '@/projects/controllers/project.private.controller';
import { ProjectService } from '@/projects/projects.service';
import { ProjectRepository } from '@/projects/repository/project.repository';

@Module({
  imports:     [MembersModule, AssetModule],
  controllers: [ProjectPrivateController],
  providers:   [
    MembersService,
    PrismaService,
    CompetitionRepository,
    ProjectRepository,
    ProjectService,
  ],
  exports: [],
})
export class ProjectModule {
}
