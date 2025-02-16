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
  async getMemberWithData(uuid: string) {
    return this.prisma.member.findUnique({
      where:   { uuid },
      include: {
        profile: true, links: true, portfolio: true, awards: true, skills: true, history: true, visitStats: true,
      },
    });
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
  async updateMemberProfileImage(uuid: string, assetUUID: string) {
    return this.prisma.member.update({
      where: { uuid },
      data:  { profile: { connect: { uuid: assetUUID } } },
    });
  }
}
