import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { CreatePortfolioDto, PortfolioDto } from '@/projects/dto/portfolio.dto';
import { ProjectService } from '@/projects/projects.service';

@Controller('admin/projects')
@UseGuards(UserAuthGuard, PermissionGuard)
@RequirePermissions(P.PORTFOLIO_MANAGE)
@ApiExtraModels(PortfolioDto)
export class ProjectPrivateController {
  constructor(private readonly projectService: ProjectService) {
  }
  @Get()
  @ApiOperation({ summary: '모든 프로젝트 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(PortfolioDto) },
  })
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }
  @Post()
  @ApiOperation({
    summary: '프로젝트 생성', description: 'members, links, competitions는 ',
  })
  @ApiCommonResponse(HttpStatus.CREATED, { $ref: getSchemaPath(PortfolioDto) })
  async createProject(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.projectService.createProject(createPortfolioDto);
  }
}
