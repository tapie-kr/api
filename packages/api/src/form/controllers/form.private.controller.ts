import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { CreateFormDto, FormDto, UpdateFormDto } from '@/form/dto/form.dto';
import { FormResponseDto } from '@/form/dto/response.dto';
import { FormService } from '@/form/form.service';

@Controller('form/admin')
@RequirePermissions(P.FORM_MANAGE)
@UseGuards(UserAuthGuard, PermissionGuard)
@ApiBearerAuth('accessToken')
@ApiExtraModels(FormDto, FormResponseDto)
export class FormPrivateController {
  constructor(private readonly applyFormService: FormService) {
  }
  @Post()
  @ApiOperation({
    summary: '지원 폼 생성', description: '지원 폼을 생성합니다. (응답 생성 X)',
  })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(FormDto) },
  })
  create(@Body() createFormDto: CreateFormDto) {
    return this.applyFormService.create(createFormDto);
  }
  @Patch(':id')
  @ApiOperation({ summary: '특정 지원 폼 수정' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormDto) })
  update(@Param('id') id: number, @Body() updateFormDto: UpdateFormDto) {
    return this.applyFormService.update(id, updateFormDto);
  }
  @Delete(':id')
  @ApiOperation({ summary: '지원 폼 삭제' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  remove(@Param('id') id: number) {
    return this.applyFormService.remove(id);
  }
  @Get()
  @ApiOperation({ summary: '지원 폼 모두 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(FormDto) },
  })
  findAll() {
    return this.applyFormService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: '지원 폼 데이터 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormDto) })
  findOne(@Param('id') id: number) {
    // 특정 지원 폼 조회하기
    return this.applyFormService.findOne(id);
  }
  @Get(':id/responses')
  @ApiOperation({ summary: '특정 지원 폼의 모든 응답 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(FormResponseDto) },
  })
  findAllResponses(@Param('id') id: number) {
    // 특정 지원 폼의 응답 조회하기
    return this.applyFormService.findAllResponses(id);
  }
  @Get('responses/:responseId')
  @ApiOperation({ summary: '특정 지원 폼의 특정 응답 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormResponseDto) })
  findOneResponse(@Param('responseId') responseId: string) {
    // 특정 지원 폼의 특정 응답 조회하기
    return this.applyFormService.findOneResponse(responseId);
  }
  @Post(':id/activate')
  @ApiOperation({ summary: '지원 폼 활성화' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormDto) })
  activateForm(@Param('id') id: number) {
    return this.applyFormService.activateForm(id);
  }
  @Post(':id/deactivate')
  @ApiOperation({ summary: '지원 폼 비활성화' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(FormDto) })
  deactivateForm(@Param('id') id: number) {
    return this.applyFormService.deactivateForm(id);
  }
}
