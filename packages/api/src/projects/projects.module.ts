import { Module } from '@nestjs/common';
import { AssetModule } from '@/asset/asset.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { MembersModule } from '@/members/members.module';
import { MembersService } from '@/members/service/members.service';
import { CompetitionRepository } from '@/portfolio/repository/competition.repository';
import { ProjectPrivateController } from '@/projects/controllers/project.private.controller';
import { ProjectPublicController } from '@/projects/controllers/project.public.controller';
import { ProjectLinkPrivateController } from '@/projects/controllers/projectLink.private.controller';
import { ProjectMemberPrivateController } from '@/projects/controllers/projectMember.private.controller';
import { ProjectService } from '@/projects/projects.service';
import { ProjectRepository } from '@/projects/repository/project.repository';
import { ProjectMemberRepository } from '@/projects/repository/projectMember.repository';

@Module({
  imports:     [MembersModule, AssetModule],
  controllers: [
    ProjectPrivateController,
    ProjectMemberPrivateController,
    ProjectLinkPrivateController,
    ProjectPublicController,
  ],
  providers: [
    MembersService,
    PrismaService,
    CompetitionRepository,
    ProjectRepository,
    ProjectMemberRepository,
    ProjectService,
  ],
  exports: [],
})
export class ProjectModule {
}
