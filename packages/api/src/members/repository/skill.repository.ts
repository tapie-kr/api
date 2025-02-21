import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { omit } from '@/common/utils/object';
import { CreateMemberSkillDto, CreateSkillDto, UpdateMemberSkillDto } from '@/members/dto/member-skill.dto';

@Injectable()
export class SkillRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getSkill(uuid: string) {
    return this.prisma.skill.findUnique({ where: { uuid } });
  }
  async hasSkill(memberUUID: string, skillUUID: string) {
    const skill = await this.prisma.memberSkill.findFirst({ where: {
      memberUUID, skillUUID,
    } });

    return !!skill;
  }
  async createSkill(data: CreateSkillDto) {
    return this.prisma.skill.create({ data });
  }
  async addMemberSkill(memberUUID: string, data: CreateMemberSkillDto & {
    skillUUID: string;
  }) {
    const inputMemberSkillData = omit<CreateMemberSkillDto>(data, ['skill']);

    return this.prisma.member.update({
      where: { uuid: memberUUID },
      data:  {
        ...inputMemberSkillData, skills: { connect: { uuid: data.skillUUID } },
      },
    });
  }
  async updateMemberSkill(skillId: string, data: UpdateMemberSkillDto) {
    const inputMemberSkillData = omit<UpdateMemberSkillDto>(data, ['skill']) as Omit<UpdateMemberSkillDto, 'skill'>;

    return this.prisma.memberSkill.update({
      where: { uuid: skillId },
      data:  { ...inputMemberSkillData },
    });
  }
  async removeMemberSkill(memberUUID: string, skillId: string) {
    return this.prisma.member.update({
      where: { uuid: memberUUID },
      data:  { skills: { disconnect: { uuid: skillId } } },
    });
  }
}
