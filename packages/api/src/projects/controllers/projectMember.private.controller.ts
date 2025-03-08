import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { ConnectOriginMemberDto, PreviewPortfolioMemberDto } from '@/projects/dto/portfolio-member.dto';
import { ProjectService } from '@/projects/projects.service';

@Controller('admin/projects/members')
@UseGuards(UserAuthGuard, PermissionGuard)
@RequirePermissions(P.PORTFOLIO_MANAGE)
@ApiExtraModels(PreviewPortfolioMemberDto)
export class ProjectMemberPrivateController {
  constructor(private readonly projectService: ProjectService) {
  }
  @Get()
  @ApiOperation({ summary: '모든 프로젝트 멤버 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(PreviewPortfolioMemberDto) },
  })
  async getAllProjectMembers() {
    return this.projectService.getAllProjectMembers();
  }
  @Patch(':projectMemberUUID/connect')
  @ApiOperation({ summary: '프로젝트 멤버 연결하기' })
  @ApiCommonResponse(HttpStatus.OK, { example: 'ok' })
  async connectProjectMember(@Param('projectMemberUUID') projectMemberUUID: string, @Body() data: ConnectOriginMemberDto) {
    return this.projectService.connectProjectMember(projectMemberUUID, data);
  }
}
