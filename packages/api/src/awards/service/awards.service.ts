import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAwardDto } from '@/awards/dto/award.dto';
import { ConnectCompetitionDto } from '@/awards/dto/competition.dto';
import { AwardRepository } from '@/awards/repository/award.repository';
import { CompetitionRepository } from '@/awards/repository/competition.repository';

@Injectable()
export class AwardsService {
  constructor(private readonly awardsRepository: AwardRepository, private readonly competitionRepository: CompetitionRepository) {

  }
  async getAllAwards(_options: {
    publicOnly: boolean;
  }) {
    return this.awardsRepository.getAllAwards();
  }
  private async competitionConnector(data: ConnectCompetitionDto) {
    if (data.uuid && data.name) {
      throw new BadRequestException('대회를 연결하거나 새로운 대회를 만드는 것 중 하나만 선택해야 합니다.');
    } else if (data.uuid) {
      const competition = await this.competitionRepository.getCompetitionById(data.uuid);

      if (!competition) {
        throw new BadRequestException('대회를 찾을 수 없습니다.');
      }

      return competition;
    } else if (data.name) {
      return await this.competitionRepository.createCompetition({ name: data.name });
    }
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

    await this.awardsRepository.createAward(data);
  }
  async addMembersToAward(awardUUID: string, membersUUID: string[]) {
    return this.awardsRepository.addMembersToAward(awardUUID, membersUUID);
  }
}
