import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@tapie-kr/api-database';
import { PrismaOperationFailedError, PrismaUniqueConstraintError, toTypedPrismaError } from '@/common/prisma/prisma.exception';
import { PrismaService } from '@/common/prisma/prisma.service';
import { omit } from '@/common/utils/object';
import { CreateAwardDto } from '@/portfolio/dto/award.dto';

@Injectable()
export class AwardRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getAllAwards() {
    return this.prisma.award.findMany({ include: {
      members: { select: {
        uuid:     true,
        username: true,
        name:     true,
      } },
      competition: true,
    } });
  }
  async createAward(data: CreateAwardDto & {
    competitionUUID: string;
  }) {
    try {
      const inputAwardData = omit<CreateAwardDto>(data, ['membersUUID', 'competitionUUID']);

      const createData: Prisma.XOR<Prisma.AwardCreateInput, Prisma.AwardUncheckedCreateInput>  = {
        ...inputAwardData, competition: { connect: { uuid: data.competitionUUID } },
      };

      if (data.membersUUID) {
        createData.members = { connect: data.membersUUID.map(uuid => ({ uuid })) };
      }

      return this.prisma.award.create({ data: createData });
    } catch (error) {
      const prismaException = toTypedPrismaError(error);

      if (prismaException instanceof PrismaOperationFailedError) {
        throw new BadRequestException('입력된 데이터 값이 잘못되었습니다.');
      } else if (prismaException instanceof PrismaUniqueConstraintError) {
        throw new BadRequestException('일부 데이터의 값은 이름이 중복될 수 없습니다.');
      }

      throw error;
    }
  }
  async deleteAward(awardUUID: string) {
    return this.prisma.award.delete({ where: { uuid: awardUUID } });
  }
  async addMembersToAward(competitionUUID: string, membersUUID: string[]) {
    return this.prisma.award.update({
      where: { uuid: competitionUUID },
      data:  { members: { connect: membersUUID.map(uuid => ({ uuid })) } },
    });
  }
  async deleteMemberFromAward(awardUUID: string, memberUUID: string) {
    return this.prisma.award.update({
      where: { uuid: awardUUID },
      data:  { members: { disconnect: { uuid: memberUUID } } },
    });
  }
}
