import { PrismaService } from '@api/common/prisma/prisma.service';
import { MemberRepository } from '@api/members/repository/member.repository';
import { MembersService } from '@api/members/service/members.service';
import { Module } from '@nestjs/common';

@Module({
  imports:     [],
  controllers: [],
  providers:   [
    MemberRepository,
    MembersService,
    PrismaService,
  ],
  exports: [MemberRepository, MembersService],
})
export class MembersModule {
}
