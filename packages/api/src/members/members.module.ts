import { Module } from '@nestjs/common';
import { AssetModule } from '@/asset/asset.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { MemberPrivateController } from '@/members/controllers/member.private.controller';
import { MemberPublicController } from '@/members/controllers/member.public.controller';
import { MemberRepository } from '@/members/repository/member.repository';
import { MembersService } from '@/members/service/members.service';

@Module({
  imports:     [AssetModule],
  controllers: [MemberPublicController, MemberPrivateController],
  providers:   [
    MemberRepository,
    MembersService,
    PrismaService,
  ],
  exports: [MemberRepository, MembersService],
})
export class MembersModule {
}
