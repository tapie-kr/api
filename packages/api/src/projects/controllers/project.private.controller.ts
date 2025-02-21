import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { AwardDto } from '@/portfolio/dto/award.dto';
import { ProjectService } from '@/projects/projects.service';

@Controller('admin/projects')
@UseGuards(UserAuthGuard, PermissionGuard)
@RequirePermissions(P.PORTFOLIO_MANAGE)
@ApiExtraModels(AwardDto)
export class ProjectPrivateController {
  constructor(private readonly projectService: ProjectService) {
  }
  @Get()
  @ApiOperation({ summary: '모든 프로젝트 가져오기' })
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }
}
