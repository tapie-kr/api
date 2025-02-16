import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateMemberDto } from '@/members/dto/create.dto';

@Injectable()
export class MemberRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getMember(uuid: string) {
    return this.prisma.member.findUnique({ where: { uuid } });
  }
  async getMemberByUsername(username: string) {
    return this.prisma.member.findUnique({ where: { username } });
  }
  async getMemberByGoogleEmail(email: string) {
    return this.prisma.member.findUnique({ where: { googleEmail: email } });
  }
  async getAllMembers() {
    return this.prisma.member.findMany({ include: { profile: true } });
  }
  async createMember(data: CreateMemberDto) {
    return this.prisma.member.create({ data });
  }
}
