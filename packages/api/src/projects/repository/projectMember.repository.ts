import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class ProjectMemberRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getAllProjectMembers() {
    return this.prisma.portfolioMember.findMany({ include: { member: { include: { profile: true } } } });
  }
  async connectProjectMember(projectMemberUUID: string, originMemberUUID: string) {
    return this.prisma.portfolioMember.update({
      where: { uuid: projectMemberUUID },  data: { member: { connect: { uuid: originMemberUUID } } },
    });
  }
}
