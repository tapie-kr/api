import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMember(uuid: string) {
    return this.prisma.member.findUnique({
      where: { uuid },
    });
  }

  async getMemberByUsername(username: string) {
    return this.prisma.member.findUnique({
      where: { username },
    });
  }

  async getMemberByGoogleEmail(email: string) {
    return this.prisma.member.findUnique({
      where: { googleEmail: email },
    });
  }
}
