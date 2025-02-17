import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto } from '@/awards/dto/competition.dto';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class CompetitionRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async createCompetition(data: CreateCompetitionDto) {
    return this.prisma.competition.create({ data });
  }
  async getCompetitionById(uuid: string) {
    return this.prisma.competition.findUnique({ where: { uuid } });
  }
}
