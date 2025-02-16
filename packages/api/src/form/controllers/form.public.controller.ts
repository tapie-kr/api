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
import { FormDto } from '@/form/dto/form.dto';
import { CreateFormResponseDto, FormResponseDto, UpdateFormResponseDto } from '@/form/dto/response.dto';
import { FormService } from '@/form/form.service';

@Controller('form')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('accessToken')
@ApiExtraModels(FormDto, FormResponseDto)
export class FormPublicController {
  constructor(private readonly formService: FormService) {
  }
  @Get()
  @ApiOperation({ summary: '활성화 된 폼 찾기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormDto) })
  async findActiveForm() {
    return this.formService.getActiveForm();
  }
  @Post(':id/response')
  @ApiOperation({ summary: '새 응답 만들기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  async createResponse(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }, @Body() createResponseDto: CreateFormResponseDto) {
    return this.formService.createResponse(id, req.user, createResponseDto);
  }
  @Get(':id/response')
  @ApiOperation({ summary: '내 응답 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  async findResponse(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.findResponse(id, req.user);
  }
  @Patch(':id/response')
  @ApiOperation({ summary: '내 응답 수정하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  async updateResponse(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }, @Body() updateFormResponseDto: UpdateFormResponseDto) {
    return this.formService.updateResponse(id, req.user, updateFormResponseDto);
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
  @ApiCommonResponse(HttpStatus.OK, {  })
  async updateResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }, @UploadedFile() file: Express.Multer.File) {
    return this.formService.attachFileToResponse(id, req.user, file);
  }
  @Get(':id/response/file')
  @ApiOperation({ summary: '내 응답에 있는 파일 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, { properties: { presignedUrl: {
    type: 'string', example: 'https://example.com',
  } } })
  async getResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.getFileFromResponse(id, req.user);
  }
  @Delete(':id/response/file')
  @ApiOperation({ summary: '내 응답에 있는 파일 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  async removeResponseFile(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.removeFileFromResponse(id, req.user);
  }
  @Post(':id/response/apply')
  @ApiOperation({
    summary: '내 응답 제출하기', description: '응답을 제출하면 수정할 수 없음 (GET 요청만 허용)',
  })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  async applyForm(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.submitResponse(id, req.user);
  }
  @Delete(':id/response')
  @ApiOperation({ summary: '내 응답 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  async removeResponse(@Param('id') id: number, @Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return this.formService.removeResponse(id, req.user);
  }
  @Get(':id/accessibility')
  @ApiOperation({ summary: '해당 폼 접근 가능 여부' })
  @ApiCommonResponse(HttpStatus.OK, { type: 'boolean' })
  async isAvailableToAccessForm(@Param('id') id: number) {
    return this.formService.isAvailableToAccessForm(id);
  }
}

