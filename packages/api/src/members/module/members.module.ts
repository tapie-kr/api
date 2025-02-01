import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MemberRepository } from '../repository/member.repository';
import { MembersService } from '../service/members.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MemberRepository, MembersService, PrismaService],
  exports: [MemberRepository, MembersService],
})
export class MembersModule {}
