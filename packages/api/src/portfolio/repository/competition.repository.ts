import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaOperationFailedError, PrismaUniqueConstraintError, toTypedPrismaError } from '@/common/prisma/prisma.exception';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateCompetitionDto } from '@/portfolio/dto/competition.dto';

@Injectable()
export class CompetitionRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async createCompetition(data: CreateCompetitionDto) {
    try {
      return await this.prisma.competition.create({ data });
    } catch (error) {
      const prismaException = toTypedPrismaError(error);

      if (
        prismaException instanceof PrismaUniqueConstraintError
      ) {
        throw new BadRequestException('대회의 이름은 중복될 수 없습니다');
      }

      throw error;
    }
  }
  async deleteCompetition(uuid: string) {
    try {
      return await this.prisma.competition.delete({ where: { uuid } });
    } catch (error) {
      const prismaException = toTypedPrismaError(error);

      if (prismaException instanceof PrismaOperationFailedError) {
        throw new BadRequestException('대회를 찾을 수 없습니다.');
      }
    }
  }
  async getCompetitionById(uuid: string, options: {
    includeAwards: boolean;
  }) {
    return this.prisma.competition.findUnique({
      where: { uuid }, include: { awards: options.includeAwards },
    });
  }
  async getAllCompetitions() {
    return this.prisma.competition.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
