import { Injectable } from '@nestjs/common';
import { Prisma } from '@tapie-kr/api-database';
import { CreateAwardDto } from '@/awards/dto/award.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { omit } from '@/common/utils/object';

@Injectable()
export class AwardRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getAllAwards() {
    return this.prisma.award.findMany({ include: { members: { select: {
      uuid:     true,
      username: true,
      name:     true,
    } } } });
  }
  async createAward(data: CreateAwardDto & {
    competitionUUID: string;
  }) {
    const inputAwardData = omit<CreateAwardDto>(data, ['membersUUID', 'competitionUUID']);

    const createData: Prisma.XOR<Prisma.AwardCreateInput, Prisma.AwardUncheckedCreateInput>  = {
      ...inputAwardData, competition: { connect: { uuid: data.competitionUUID } },
    };

    if (data.membersUUID) {
      createData.members = { connect: data.membersUUID.map(uuid => ({ uuid })) };
    }

    return this.prisma.award.create({ data: createData });
  }
}
