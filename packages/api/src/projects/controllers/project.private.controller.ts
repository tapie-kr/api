import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { CreatePortfolioDto, PortfolioDto, PreviewPortfolioDto } from '@/projects/dto/portfolio.dto';
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
    type: 'array', items: { $ref: getSchemaPath(PreviewPortfolioDto) },
  })
  async getAllProjects() {
    return this.projectService.getAllProjects({ publicOnly: false });
  }
  @Post()
  @ApiOperation({
    summary:     '프로젝트 생성',
    description: 'members, links, competitions는 기존 데이터를 연결하려면 uuid만, ' +
      '새로운 데이터를 자동으로 추가하려면 uuid를 제외한 데이터를 추가하세요.',
  })
  @ApiCommonResponse(HttpStatus.CREATED, { $ref: getSchemaPath(PortfolioDto) })
  async createProject(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.projectService.createProject(createPortfolioDto);
  }
  @Post(':projectUUID/thumbnails')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: {
    type:       'object',
    properties: { file: {
      type:        'string',
      format:      'binary',
      description: '이미지 파일',
    } },
  } })
  @ApiOperation({ summary: '유저 프로필 이미지 수정하기' })
  @UseInterceptors(FileInterceptor('file', { fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      return callback(new BadRequestException('지원되지 않는 파일 형식입니다.'), false);
    }

    callback(null, true);
  } }))
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  async updateThumbnailFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('이미지 파일이 필요합니다.');
    }
  }
  @Delete(':projectUUID/thumbnails/:imageIndex')
  @ApiOperation({ summary: '유저 프로필 이미지 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  async deleteThumbnailImage() {
  }
}
