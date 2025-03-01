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
    return this.prisma.portfolio.findMany({
      include: {
        members:     { include: { member: { include: { profile: true } } } },
        links:       true,
        competition: true,
        thumbnails:  true,
      },
      orderBy: [{ competition: { uuid: 'desc' } }, { createdAt: 'desc' }],
    });
  }
  async getProjectById(uuid: string) {
    return this.prisma.portfolio.findUnique({
      where:   { uuid },
      include: {
        members: true, links: true, competition: true, thumbnails: true,
      },
    });
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
  async createPortfolioLink(createPortfolioLink: CreatePortfolioLinkDto, portfolioUUID?: string) {
    try {
      const data = omit<CreatePortfolioLinkDto>(createPortfolioLink, ['portfolioUUID']);

      return await this.prisma.portfolioLink.create({ data: {
        ...data, portfolio: { connect: { uuid: portfolioUUID } },
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
  async attachThumbnailImage(projectUUID: string, assetUUID: string) {
    const project = await this.getProjectById(projectUUID);

    if (!project) {
      throw new BadRequestException('프로젝트를 찾을 수 없습니다.');
    }

    return this.prisma.portfolio.update({
      where: { uuid: projectUUID },
      data:  { thumbnails: { connect: { uuid: assetUUID } } },
    });
  }
  async deleteThumbnailImage(projectUUID: string, imageIndex: number) {
    const project = await this.getProjectById(projectUUID);

    if (!project) {
      throw new BadRequestException('프로젝트를 찾을 수 없습니다.');
    }

    if (!project.thumbnails[imageIndex]) {
      throw new BadRequestException('삭제할 이미지가 존재하지 않습니다.');
    }

    return this.prisma.portfolio.update({
      where: { uuid: projectUUID },
      data:  { thumbnails: { disconnect: { uuid: project.thumbnails[imageIndex].uuid } } },
    });
  }
  async deletePortfolioLink(linkUUID: string) {
    const link = await this.getPortfolioLinkById(linkUUID);

    if (!link) {
      throw new BadRequestException('링크를 찾을 수 없습니다.');
    }

    return this.prisma.portfolioLink.delete({ where: { uuid: linkUUID } });
  }
  async updateProject(projectUUID: string, data: Prisma.PortfolioUpdateInput) {
    try {
      return await this.prisma.portfolio.update({
        where:   { uuid: projectUUID },
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

      throw error;
    }
  }
}
