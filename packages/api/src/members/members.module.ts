import { Module } from '@nestjs/common';
import { AssetModule } from '@/asset/asset.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { MemberPrivateController } from '@/members/controllers/member.private.controller';
import { MemberPublicController } from '@/members/controllers/member.public.controller';
import { MemberRepository } from '@/members/repository/member.repository';
import { SkillRepository } from '@/members/repository/skill.repository';
import { MembersService } from '@/members/service/members.service';

@Module({
  imports:     [AssetModule],
  controllers: [MemberPublicController, MemberPrivateController],
  providers:   [
    MemberRepository,
    SkillRepository,
    MembersService,
    PrismaService,
  ],
  exports: [
    MemberRepository,
    SkillRepository,
    MembersService,
  ],
})
export class MembersModule {
}
