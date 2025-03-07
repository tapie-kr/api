import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { Response } from 'express';
import { MemberPayloadDto } from '@/auth/dto/member-payload.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { FormDto, FormPreviewDto } from '@/form/dto/form.dto';
import { CreateFormResponseDto, FormResponseDto, UpdateFormResponseDto } from '@/form/dto/response.dto';
import { FormService } from '@/form/form.service';

@Controller('form')
@ApiBearerAuth('accessToken')
@ApiExtraModels(FormDto, FormResponseDto)
export class FormPublicController {
  constructor(private readonly formService: FormService) {
  }
  @Get()
  @ApiOperation({ summary: '활성화 된 폼 찾기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormPreviewDto) })
  async findActiveForm() {
    return this.formService.getActiveForm();
  }
  @Get(':id/accessibility')
  @ApiOperation({ summary: '해당 폼 접근 가능 여부' })
  @ApiCommonResponse(HttpStatus.OK, { type: 'boolean' })
  async isAvailableToAccessForm(@Param('id') id: number) {
    return this.formService.isAvailableToAccessForm(id);
  }
  @Post(':id/application')
  @ApiOperation({
    summary: '새 응답 만들기', deprecated: true,
  })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  @UseGuards(JwtAuthGuard)
  async createResponse(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }, @Body() createResponseDto: CreateFormResponseDto) {
    return this.formService.createResponse(id, req.user, createResponseDto);
  }
  @Get(':id/application')
  @ApiOperation({ summary: '내 응답 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  @UseGuards(JwtAuthGuard)
  async findResponse(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.findResponse(id, req.user);
  }
  @Patch(':id/application')
  @ApiOperation({ summary: '내 응답 수정하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  @UseGuards(JwtAuthGuard)
  async updateResponse(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }, @Body() updateFormResponseDto: UpdateFormResponseDto) {
    return this.formService.updateResponse(id, req.user, updateFormResponseDto);
  }
  @Patch(':id/application/file')
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
  @ApiCommonResponse(HttpStatus.OK, {  })
  @UseGuards(JwtAuthGuard)
  async updateResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }, @UploadedFile() file: Express.Multer.File) {
    return this.formService.attachFileToResponse(id, req.user, file);
  }
  @Get(':id/application/file')
  @ApiOperation({ summary: '내 응답에 있는 파일 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, { properties: { presignedUrl: {
    type: 'string', example: 'https://example.com',
  } } })
  @UseGuards(JwtAuthGuard)
  async getResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.getFileFromResponse(id, req.user);
  }
  @Delete(':id/application/file')
  @ApiOperation({ summary: '내 응답에 있는 파일 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  @UseGuards(JwtAuthGuard)
  async removeResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.removeFileFromResponse(id, req.user);
  }
  @Post(':id/application/apply')
  @ApiOperation({
    summary: '내 응답 제출하기', description: '응답을 제출하면 수정할 수 없음 (GET 요청만 허용)',
  })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  @UseGuards(JwtAuthGuard)
  async applyForm(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.submitResponse(id, req.user);
  }
  @Delete(':id/application')
  @ApiOperation({ summary: '내 응답 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  @UseGuards(JwtAuthGuard)
  async removeResponse(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.removeResponse(id, req.user);
  }
}

