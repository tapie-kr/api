import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { MemberRepository } from '@/members/repository/member.repository';
import { MembersService } from '@/members/service/members.service';

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
