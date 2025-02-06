import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateProfileLinkDtoType, type UpdateProfileLinkDtoType } from '@/members/dto/profile-link.dto';

@Injectable()
export class ProfileLinkRepository {
  constructor(private prisma: PrismaService) {
  }
  async create(data: CreateProfileLinkDtoType) {
    return this.prisma.memberLink.create({ data: {
      label:      data.label,
      href:       data.href,
      icon:       data.icon,
      memberUUID: data.memberUUID,
    } });
  }
  async findByMemberId(memberUUID: string) {
    return this.prisma.memberLink.findMany({ where: { memberUUID } });
  }
  async findOne(id: number) {
    return this.prisma.memberLink.findUnique({ where: { id } });
  }
  async update(id: number, data: UpdateProfileLinkDtoType) {
    return this.prisma.memberLink.update({
      where: { id },
      data,
    });
  }
  async delete(id: number) {
    return this.prisma.memberLink.delete({ where: { id } });
  }
}
