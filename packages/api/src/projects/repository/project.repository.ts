import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@tapie-kr/api-database';
import { PrismaOperationFailedError, PrismaUniqueConstraintError, toTypedPrismaError } from '@/common/prisma/prisma.exception';
import { PrismaService } from '@/common/prisma/prisma.service';
import { omit } from '@/common/utils/object';
import { CreatePortfolioLinkDto } from '@/projects/dto/portfolio-link.dto';
import { CreatePortfolioMemberDto } from '@/projects/dto/portfolio-member.dto';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getAllProjects() {
    return this.prisma.portfolio.findMany({ include: {
      members: true, links: true, competition: true, thumbnails: true,
    } });
  }
  async createProject(data: Prisma.PortfolioCreateInput) {
    try {
      return await this.prisma.portfolio.create({
        data,
        include: {
          members: true, links: true, competition: true,
        },
      });
    } catch (error) {
      const prismaException = toTypedPrismaError(error);

      if (prismaException instanceof PrismaOperationFailedError) {
        throw new BadRequestException('입력된 데이터 값이 잘못되었습니다.');
      }

      if (prismaException instanceof PrismaUniqueConstraintError) {
        throw new BadRequestException('포트폴리오 이름은 중복될 수 없습니다.');
      }

      throw error;
    }
  }
  async getPortfolioMemberById(uuid: string) {
    return this.prisma.portfolioMember.findUnique({ where: { uuid } });
  }
  async createPortfolioMember(createPortfolioMemberDto: CreatePortfolioMemberDto) {
    try {
      return await this.prisma.portfolioMember.create({ data: {
        ...createPortfolioMemberDto,
        portfolio: { },
      } });
    } catch (error) {
      const prismaException = toTypedPrismaError(error);

      if (
        prismaException instanceof PrismaOperationFailedError
      ) {
        throw new BadRequestException('멤버를 생성하는데 실패했습니다.');
      }

      throw error;
    }
  }
  async getPortfolioLinkById(uuid: string) {
    return this.prisma.portfolioLink.findUnique({ where: { uuid } });
  }
  async createPortfolioLink(createPortfolioLink: CreatePortfolioLinkDto) {
    try {
      const data = omit<CreatePortfolioLinkDto>(createPortfolioLink, ['portfolioUUID']);

      return await this.prisma.portfolioLink.create({ data: {
        ...data, portfolio: {  },
      } });
    } catch (error) {
      const prismaException = toTypedPrismaError(error);

      if (
        prismaException instanceof PrismaOperationFailedError
      ) {
        throw new BadRequestException('링크를 생성하는데 실패했습니다.');
      }

      throw error;
    }
  }
}
