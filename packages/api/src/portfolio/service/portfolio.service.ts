import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaOperationFailedError, toTypedPrismaError } from '@/common/prisma/prisma.exception';
import { AwardPublicPreviewDto, CreateAwardDto } from '@/portfolio/dto/award.dto';
import { ConnectCompetitionDto } from '@/portfolio/dto/competition.dto';
import { AwardRepository } from '@/portfolio/repository/award.repository';
import { CompetitionRepository } from '@/portfolio/repository/competition.repository';

@Injectable()
export class PortfolioService {
  constructor(private readonly awardsRepository: AwardRepository, private readonly competitionRepository: CompetitionRepository) {

  }
  async getAllAwards(options: {
    publicOnly: boolean; filterByYear?: number;
  }) {
    let awards = await this.awardsRepository.getAllAwards();

    if (options.filterByYear) {
      awards = awards.filter(award => new Date(award.rewardedAt).getFullYear() === options.filterByYear);
    }

    if (options.publicOnly) {
      return awards.map(award => {
        return {
          uuid:        award.uuid,
          fullTitle:   award.title + ' ' + award.gradeLabel,
          memberNames: award.members.map(member => member.name),
        } satisfies AwardPublicPreviewDto;
      });
    }

    return awards;
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
  async createAward(createAwardDto: CreateAwardDto) {
    let data = {
      competitionUUID: undefined,
      ...createAwardDto,
    };

    if (createAwardDto.competition) {
      const competition = await this.competitionConnector(createAwardDto.competition);

      data.competitionUUID = competition.uuid;
    }

    return this.awardsRepository.createAward(data);
  }
  async deleteAward(awardUUID: string) {
    try {
      return await this.awardsRepository.deleteAward(awardUUID);
    } catch (error) {
      const prismaException = toTypedPrismaError(error);

      if (prismaException instanceof PrismaOperationFailedError) {
        throw new BadRequestException('수상 데이터를 찾을 수 없습니다.');
      }

      throw error;
    }
  }
  async addMembersToAward(awardUUID: string, membersUUID: string[]) {
    return this.awardsRepository.addMembersToAward(awardUUID, membersUUID);
  }
  async deleteMemberFromAward(awardUUID: string, memberUUID: string) {
    return this.awardsRepository.deleteMemberFromAward(awardUUID, memberUUID);
  }
  async getAwardsByCompetition(competitionUUID: string) {
    return this.competitionRepository.getCompetitionById(competitionUUID, { includeAwards: true });
  }
  async getAllCompetitions() {
    return this.competitionRepository.getAllCompetitions();
  }
  async deleteCompetition(competitionUUID: string) {
    return this.competitionRepository.deleteCompetition(competitionUUID);
  }
}
