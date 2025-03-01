import { Controller, Get, UseGuards } from '@nestjs/common';
import { AssetService } from '@/asset/asset.service';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { ProjectService } from '@/projects/projects.service';

@Controller('projects')
@UseGuards(UserAuthGuard, PermissionGuard)
export class ProjectPublicController {
  constructor(private readonly projectService: ProjectService,
    private readonly assetService: AssetService) {
  }
  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects({ publicOnly: true });
  }
}
