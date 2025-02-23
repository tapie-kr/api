import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@tapie-kr/api-database';
import { PrismaOperationFailedError, toTypedPrismaError } from '@/common/prisma/prisma.exception';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreatePortfolioPrismaDto } from '@/projects/dto/portfolio.dto';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getAllProjects() {
    return this.prisma.portfolio.findMany();
  }
  async createProject(data: CreatePortfolioPrismaDto & {
    membersUUID: string[];
  }) {
    try {
      const createData: Prisma.XOR<Prisma.PortfolioCreateInput, Prisma.PortfolioUncheckedCreateInput> = {
        ...data,
        members: { connect: data.membersUUID.map(uuid => ({ uuid })) },
      };
    } catch (error) {
      const prismaException = toTypedPrismaError(error);

      if (prismaException instanceof PrismaOperationFailedError) {
        throw new BadRequestException('입력된 데이터 값이 잘못되었습니다.');
      }

      throw error;
    }
  }
}
