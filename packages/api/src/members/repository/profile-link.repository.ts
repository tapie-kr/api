import { Injectable } from '@nestjs/common';
import { CreateProfileLinkDto } from '../dto/create-profile-link.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateProfileLinkDto } from '../dto/update-profile-link.dto';

@Injectable()
export class ProfileLinkRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProfileLinkDto) {
    return this.prisma.memberLink.create({
      data: {
        label: data.label,
        href: data.url,
        icon: data.icon,
        memberUUID: data.memberUUID,
      },
    });
  }

  async findByMemberId(memberUUID: string) {
    return this.prisma.memberLink.findMany({
      where: { memberUUID },
    });
  }

  async update(data: Partial<UpdateProfileLinkDto>) {
    return this.prisma.memberLink.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.memberLink.delete({
      where: { id },
    });
  }
}
