import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '@/projects/repository/project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {
  }
  async getAllProjects() {
    return this.projectRepository.getAllProjects();
  }
}
