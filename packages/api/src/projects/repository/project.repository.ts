import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getAllProjects() {
    return this.prisma.portfolio.findMany();
  }
}
