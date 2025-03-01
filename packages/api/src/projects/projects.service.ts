import { BadRequestException, Injectable } from '@nestjs/common';
import { AssetService } from '@/asset/asset.service';
import { FileType } from '@/asset/types/fileType';
import { decodeFileNameKorean } from '@/common/utils/string';
import { ConnectCompetitionDto } from '@/portfolio/dto/competition.dto';
import { CompetitionRepository } from '@/portfolio/repository/competition.repository';
import { CreatePortfolioDto, PreviewPortfolioDto, PublicPreviewPortfolioDto } from '@/projects/dto/portfolio.dto';
import { ConnectPortfolioLinkDto, CreatePortfolioLinkDto } from '@/projects/dto/portfolio-link.dto';
import { ConnectPortfolioMemberDto, PreviewPortfolioMemberDto } from '@/projects/dto/portfolio-member.dto';
import { ProjectRepository } from '@/projects/repository/project.repository';
import { ProjectMemberRepository } from '@/projects/repository/projectMember.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository,
    private readonly competitionRepository: CompetitionRepository,
    private readonly projectMemberRepository: ProjectMemberRepository,
    private readonly assetService: AssetService) {
  }
  async getAllPrivateProjects() {
    const data = await this.projectRepository.getAllProjects();

    return data.map(project => {
      let representativeThumbnailPath: string;

      if (project.thumbnails.length === 0) {
        representativeThumbnailPath = 'default.png';
      } else {
        representativeThumbnailPath = project.thumbnails[project.representativeThumbnail].path;
      }

      return {
        uuid:        project.uuid,
        name:        project.name,
        catchPhrase: project.catchPhrase,
        description: project.description,
        tags:        project.tags,
        links:       project.links,
        members:     project.members.map(projectMember => {
          const profileImageUrl = projectMember.member
            ? this.assetService.buildPublicUrl(projectMember.member.profile.path)
            : this.assetService.buildPublicUrl('profile/default.png');

          return {
            uuid:        projectMember.uuid,
            name:        projectMember.name,
            role:        projectMember.role,
            description: projectMember.description,
            createdAt:   projectMember.createdAt,
            updatedAt:   projectMember.updatedAt,
            username:    projectMember.member ? projectMember.member.username : 'unknown-user',
            profileImageUrl,
          } satisfies PreviewPortfolioMemberDto;
        }),
        competition: null,
        releasedAt:  project.releasedAt,
        createdAt:   project.createdAt,
        updatedAt:   project.updatedAt,

        representativeThumbnailUrl: this.assetService.buildPublicUrl(representativeThumbnailPath),
        thumbnailUrls:              [...project.thumbnails.map(thumbnail => this.assetService.buildPublicUrl(thumbnail.path))],

        thumbnailEffectColor: project.thumbnailEffectColor,
      } as PreviewPortfolioDto;
    });
  }
  async getAllPublicProjects() {
    const data = await this.projectRepository.getAllProjects();

    return data.map(project => {
      let representativeThumbnailPath: string;

      if (project.thumbnails.length === 0) {
        representativeThumbnailPath = 'default.png';
      } else {
        representativeThumbnailPath = project.thumbnails[project.representativeThumbnail].path;
      }

      return {
        uuid:        project.uuid,
        name:        project.name,
        catchPhrase: project.catchPhrase,
        description: project.description,
        tags:        project.tags,

        representativeThumbnailUrl: this.assetService.buildPublicUrl(representativeThumbnailPath),
        thumbnailUrls:              [...project.thumbnails.map(thumbnail => this.assetService.buildPublicUrl(thumbnail.path))],

        thumbnailEffectColor: project.thumbnailEffectColor,
        releasedAt:           project.releasedAt,
        createdAt:            project.createdAt,
        updatedAt:            project.updatedAt,
        isAwarded:            !!project.competition,
      } satisfies PublicPreviewPortfolioDto;
    });
  }
  async getAllProjects(options: {
    publicOnly: boolean;
  }) {
    if (options.publicOnly) {
      return this.getAllPublicProjects();
    }

    return this.getAllPrivateProjects();
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

    return this.projectRepository.createProject({
      ...data, representativeThumbnail: 0,
    });
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
  async attachThumbnailImage(projectUUID: string, file: Express.Multer.File) {
    const project = await this.projectRepository.getProjectById(projectUUID);

    if (!project) {
      throw new BadRequestException('프로젝트를 찾을 수 없습니다.');
    }

    const originalFileName = decodeFileNameKorean(file.originalname);
    const filename = this.assetService.generateFilename(originalFileName);

    const asset = await this.assetService.uploadFile(new File([file.buffer], originalFileName),
      filename,
      FileType.PORTFOLIO_THUMBNAIL,
      originalFileName);

    await this.projectRepository.attachThumbnailImage(projectUUID, asset.uuid);
  }
  async deleteThumbnailImage(projectUUID: string, imageIndex: number) {
    const project = await this.projectRepository.getProjectById(projectUUID);

    if (!project) {
      throw new BadRequestException('프로젝트를 찾을 수 없습니다.');
    }

    return this.projectRepository.deleteThumbnailImage(projectUUID, imageIndex);
  }
  async deletePortfolioLink(projectUUID: string, linkUUID: string) {
    const project = await this.projectRepository.getProjectById(projectUUID);

    if (!project) {
      throw new BadRequestException('프로젝트를 찾을 수 없습니다.');
    }

    return this.projectRepository.deletePortfolioLink(linkUUID);
  }
  async createPortfolioLink(projectUUID: string, data: CreatePortfolioLinkDto) {
    const project = await this.projectRepository.getProjectById(projectUUID);

    if (!project) {
      throw new BadRequestException('프로젝트를 찾을 수 없습니다.');
    }

    return this.projectRepository.createPortfolioLink(data, projectUUID);
  }
  async getAllProjectMembers() {
    const members = await this.projectMemberRepository.getAllProjectMembers();

    return members.map(projectMember => {
      const profileImageUrl = projectMember.member
        ? this.assetService.buildPublicUrl(projectMember.member.profile.path)
        : this.assetService.buildPublicUrl('profile/default.png');

      return {
        uuid:        projectMember.uuid,
        name:        projectMember.name,
        role:        projectMember.role,
        description: projectMember.description,
        createdAt:   projectMember.createdAt,
        updatedAt:   projectMember.updatedAt,
        username:    projectMember.member ? projectMember.member.username : 'unknown-user',
        profileImageUrl,
      } satisfies PreviewPortfolioMemberDto;
    });
  }
  async connectProjectMember(projectMemberUUID: string, data: ConnectPortfolioMemberDto) {
    return this.projectMemberRepository.connectProjectMember(projectMemberUUID, data.uuid);
  }
}
