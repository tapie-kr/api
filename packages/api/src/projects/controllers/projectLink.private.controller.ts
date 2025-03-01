import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { CreatePortfolioLinkDto } from '@/projects/dto/portfolio-link.dto';
import { ProjectService } from '@/projects/projects.service';

@Controller('admin/projects')
@UseGuards(UserAuthGuard, PermissionGuard)
@RequirePermissions(P.PORTFOLIO_MANAGE)
export class ProjectLinkPrivateController {
  constructor(private readonly projectService: ProjectService) {
  }
  @Post(':projectUUID/links')
  @ApiOperation({ summary: '링크 추가하기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  async createLink(@Param('projectUUID') projectUUID: string, @Body() createPortfolioLinkDto: CreatePortfolioLinkDto) {
    return this.projectService.createPortfolioLink(projectUUID, createPortfolioLinkDto);
  }
  @Delete(':projectUUID/links/:linkUUID')
  @ApiOperation({ summary: '링크 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  async deleteLink(@Param('projectUUID') projectUUID: string, @Param('linkUUID') linkUUID: string) {
    return this.projectService.deletePortfolioLink(projectUUID, linkUUID);
  }
}
