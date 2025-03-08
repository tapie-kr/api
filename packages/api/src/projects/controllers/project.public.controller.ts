import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { AssetService } from '@/asset/asset.service';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { PublicPreviewPortfolioDto } from '@/projects/dto/portfolio.dto';
import { ProjectService } from '@/projects/projects.service';

@Controller('projects')
@ApiExtraModels(PublicPreviewPortfolioDto)
export class ProjectPublicController {
  constructor(private readonly projectService: ProjectService,
    private readonly assetService: AssetService) {
  }
  @Get('/')
  @ApiOperation({ summary: '모든 프로젝트 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(PublicPreviewPortfolioDto) },
  })
  async getAllProjects() {
    return this.projectService.getAllProjects({ publicOnly: true });
  }
}
