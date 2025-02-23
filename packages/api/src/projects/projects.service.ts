import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from '@/projects/dto/portfolio.dto';
import { ProjectRepository } from '@/projects/repository/project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {
  }
  async getAllProjects() {
    return this.projectRepository.getAllProjects();
  }
  async createProject(data: CreatePortfolioDto) {
    return this.projectRepository.createProject({
      ...data, membersUUID: data.members.map(member => member.uuid),
    });.
  }
}
