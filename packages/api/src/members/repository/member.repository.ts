import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateMemberLinkDto, UpdateMemberLinkDto } from '@/members/dto/member-link.dto';
import { CreateMemberPrismaDto } from '@/members/dto/member-transaction';

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
        profile:   true,
        links:     true,
        portfolio: true,
        awards:    true,
        skills:    { include: { skill: true } },
        history:   true,
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
    return this.prisma.member.findMany({
      include: { profile: true }, orderBy: { createdAt: 'desc' },
    });
  }
  async createMember(data: CreateMemberPrismaDto) {
    return this.prisma.member.create({ data });
  }
  async updateMember(uuid: string, data: CreateMemberPrismaDto) {
    return this.prisma.member.update({
      where: { uuid }, data,
    });
  }
  async updateMemberProfileImage(uuid: string, assetUUID: string) {
    return this.prisma.member.update({
      where: { uuid },
      data:  { profile: { connect: { uuid: assetUUID } } },
    });
  }
  async deleteMemberProfileImage(uuid: string) {
    return this.prisma.member.update({
      where: { uuid },
      data:  { profile: { disconnect: true } },
    });
  }
  async addLink(uuid: string, data: CreateMemberLinkDto) {
    return this.prisma.member.update({
      where: { uuid },
      data:  { links: { create: data } },
    });
  }
  async hasLink(uuid: string, linkId: number): Promise<boolean> {
    const linkEntity = await this.prisma.memberLink.findFirst({ where: {
      memberUUID: uuid,
      id:         linkId,
    } });

    return !!linkEntity;
  }
  async removeLink(uuid: string, linkId: number) {
    return this.prisma.member.update({
      where: { uuid },
      data:  { links: { delete: { id: linkId } } },
    });
  }
  async updateLink(uuid: string, linkId: number, data: UpdateMemberLinkDto) {
    return this.prisma.member.update({
      where: { uuid },
      data:  { links: { update: {
        where: { id: linkId }, data,
      } } },
    });
  }
}
