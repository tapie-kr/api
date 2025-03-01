import { BadRequestException, Injectable } from '@nestjs/common';
import { AssetService } from '@/asset/asset.service';
import { ConnectCompetitionDto } from '@/portfolio/dto/competition.dto';
import { CompetitionRepository } from '@/portfolio/repository/competition.repository';
import { CreatePortfolioDto, PreviewPortfolioDto } from '@/projects/dto/portfolio.dto';
import { ConnectPortfolioLinkDto } from '@/projects/dto/portfolio-link.dto';
import { ConnectPortfolioMemberDto } from '@/projects/dto/portfolio-member.dto';
import { ProjectRepository } from '@/projects/repository/project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository,
    private readonly competitionRepository: CompetitionRepository,
    private readonly assetService: AssetService) {
  }
  async getAllProjects(_options: {
    publicOnly: boolean;
  }) {
    const data = await this.projectRepository.getAllProjects();

    return data.map(project => {
      const representativeThumbnailPath = 'projectThumbnails/' + project.thumbnails[project.representativeThumbnail].path;

      return {
        uuid:        project.uuid,
        name:        project.name,
        catchPhrase: project.catchPhrase,
        description: project.description,
        tags:        project.tags,
        links:       project.links,
        members:     project.members,
        competition: null,
        releasedAt:  project.releasedAt,
        createdAt:   project.createdAt,
        updatedAt:   project.updatedAt,

        representativeThumbnailUrl: this.assetService.buildPublicUrl(representativeThumbnailPath),
        thumbnailUrls:              [this.assetService.buildPublicUrl(representativeThumbnailPath)],

        thumbnailEffectColor: project.thumbnailEffectColor,
      } as PreviewPortfolioDto;
    });
  }
  async createProject(createPortfolioDto: CreatePortfolioDto) {
    const data = {
      ...createPortfolioDto,
      members: {
        create:  [],
        connect: [],
      },
      links: {
        create:  [],
        connect: [],
      },
      competition: undefined,
    };

    if (createPortfolioDto.members) {
      for (const member of createPortfolioDto.members) {
        const connectedMember = await this.projectMemberConnector(member);

        if (connectedMember.uuid) {
          data.members.connect.push({ uuid: connectedMember.uuid });
        } else {
          data.members.create.push(connectedMember);
        }
      }
    }

    if (createPortfolioDto.links) {
      for (const link of createPortfolioDto.links) {
        const connectedLink = await this.portfolioLinkConnector(link);

        if (connectedLink.uuid) {
          data.links.connect.push({ uuid: connectedLink.uuid });
        } else {
          data.links.create.push(connectedLink);
        }
      }
    }

    if (createPortfolioDto.competition) {
      const competition = await this.competitionConnector(createPortfolioDto.competition);

      data.competition = { connect: { uuid: competition.uuid } };
    }

    return this.projectRepository.createProject(data);
  }
  private async portfolioLinkConnector(data: ConnectPortfolioLinkDto) {
    if (data.uuid && data.href) {
      throw new BadRequestException('링크를 연결하거나 새로운 링크를 만드는 것 중 하나만 선택해야 합니다.');
    }

    if (data.uuid) {
      const link = await this.projectRepository.getPortfolioLinkById(data.uuid);

      if (!link) {
        throw new BadRequestException('링크를 찾을 수 없습니다.');
      }

      return link;
    }

    if (data.href) {
      return {
        uuid: undefined,
        type: data.type,
        href: data.href,
      };
    }

    throw new BadRequestException('유효한 링크 정보를 제공해야 합니다.');
  }
  private async competitionConnector(data: ConnectCompetitionDto) {
    if (data.uuid && data.name) {
      throw new BadRequestException('대회를 연결하거나 새로운 대회를 만드는 것 중 하나만 선택해야 합니다.');
    }

    if (data.uuid) {
      const competition = await this.competitionRepository.getCompetitionById(data.uuid, { includeAwards: false });

      if (!competition) {
        throw new BadRequestException('대회를 찾을 수 없습니다.');
      }

      return competition;
    }

    if (data.name) {
      return this.competitionRepository.createCompetition({ name: data.name });
    }

    throw new BadRequestException('유효한 대회 정보를 제공해야 합니다.');
  }
  private async projectMemberConnector(data: ConnectPortfolioMemberDto) {
    if (data.uuid && data.name) {
      throw new BadRequestException('멤버를 연결하거나 새로운 멤버를 만드는 것 중 하나만 선택해야 합니다.');
    }

    if (data.uuid) {
      const member = await this.projectRepository.getPortfolioMemberById(data.uuid);

      if (!member) {
        throw new BadRequestException('멤버를 찾을 수 없습니다.');
      }

      return member;
    }

    if (data.name) {
      return {
        uuid:        undefined,
        name:        data.name,
        role:        data.role,
        description: data.description,
      };
    }

    throw new BadRequestException('유효한 멤버 정보를 제공해야 합니다.');
  }
  async updateThumbnailFile() {
  }
}
