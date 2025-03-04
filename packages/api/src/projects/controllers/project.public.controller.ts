import { Controller, Get } from '@nestjs/common';
import { AssetService } from '@/asset/asset.service';
import { ProjectService } from '@/projects/projects.service';

@Controller('projects')
export class ProjectPublicController {
  constructor(private readonly projectService: ProjectService,
    private readonly assetService: AssetService) {
  }
  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects({ publicOnly: true });
  }
}
