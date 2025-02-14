import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { Member } from '@tapie-kr/api-database';
import { Response } from 'express';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CreateFormResponseDto, UpdateFormResponseDto } from '@/form/dto/response.dto';
import { ApplyFormService } from '@/form/form.service';

@Controller('form')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('accessToken')
export class ApplyFormPublicController {
  constructor(private readonly applyFormService: ApplyFormService) {
  }
  @Get()
  @ApiOperation({ summary: '활성화 된 폼 찾기' })
  async findActiveForm() {
    return this.applyFormService.getActiveForm();
  }
  @Post(':id/response')
  @ApiOperation({ summary: '새 응답 만들기' })
  async createResponse(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }, @Body() createResponseDto: CreateFormResponseDto) {
    return this.applyFormService.createResponse(id, req.user.uuid, createResponseDto);
  }
  @Get(':id/response')
  @ApiOperation({ summary: '내 응답 가져오기' })
  async findResponse(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }) {
    return this.applyFormService.findResponse(id, req.user.uuid);
  }
  @Patch(':id/response')
  @ApiOperation({ summary: '내 응답 수정하기' })
  async updateResponse(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }, @Body() updateFormResponseDto: UpdateFormResponseDto) {
    return this.applyFormService.updateResponse(id, req.user.uuid, updateFormResponseDto);
  }
  @Patch(':id/response/file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: {
    type:       'object',
    properties: { file: {
      type:        'string',
      format:      'binary',
      description: '포트폴리오 파일',
    } },
  } })
  @ApiOperation({ summary: '내 응답에 파일 첨부하기' })
  @UseInterceptors(FileInterceptor('file'))
  async updateResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }, @UploadedFile() file: Express.Multer.File) {
    return this.applyFormService.attachFileToResponse(id, req.user.uuid, file);
  }
  @Get(':id/response/file')
  @ApiOperation({ summary: '내 응답에 있는 파일 가져오기' })
  async getResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }) {
    return this.applyFormService.getFileFromResponse(id, req.user.uuid);
  }
  @Delete(':id/response/file')
  @ApiOperation({ summary: '내 응답에 있는 파일 삭제하기' })
  async removeResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }) {
    return this.applyFormService.removeFileFromResponse(id, req.user.uuid);
  }
  @Post(':id/response/apply')
  @ApiOperation({
    summary: '내 응답 제출하기', description: '응답을 제출하면 수정할 수 없음 (GET 요청만 허용)',
  })
  async applyForm(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }) {
    return this.applyFormService.submitResponse(id, req.user.uuid);
  }
  @Delete(':id/response')
  @ApiOperation({ summary: '내 응답 삭제하기' })
  async removeResponse(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }) {
    return this.applyFormService.removeResponse(id, req.user.uuid);
  }
  @Get(':id/accessibility')
  @ApiOperation({ summary: '해당 폼 접근 가능 여부' })
  async isAvailableToAccessForm(@Param('id') id: number) {
    return this.applyFormService.isAvailableToAccessForm(id);
  }
}

