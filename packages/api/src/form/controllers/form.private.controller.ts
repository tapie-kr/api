import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { CreateApplyFormDto, UpdateApplyFormDto } from '@/form/dto/form.dto';
import { ApplyFormService } from '@/form/form.service';

@Controller('form/admin')
@RequirePermissions(P.FORM_MANAGE)
@UseGuards(UserAuthGuard, PermissionGuard)
@ApiBearerAuth('accessToken')
export class ApplyFormPrivateController {
  constructor(private readonly applyFormService: ApplyFormService) {
  }
  @Post()
  @ApiOperation({
    summary: '지원 폼 생성', description: '지원 폼을 생성합니다. (응답 생성 X)',
  })
  create(@Body() createFormDto: CreateApplyFormDto) {
    return this.applyFormService.create(createFormDto);
  }
  @Patch(':id')
  @ApiOperation({ summary: '특정 지원 폼 수정' })
  update(@Param('id') id: number, @Body() updateFormDto: UpdateApplyFormDto) {
    return this.applyFormService.update(id, updateFormDto);
  }
  @Delete(':id')
  @ApiOperation({ summary: '지원 폼 삭제' })
  remove(@Param('id') id: number) {
    return this.applyFormService.remove(id);
  }
  @Get()
  @ApiOperation({ summary: '지원 폼 모두 가져오기' })
  findAll() {
    return this.applyFormService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: '지원 폼 데이터 가져오기' })
  findOne(@Param('id') id: number) {
    // 특정 지원 폼 조회하기
    return this.applyFormService.findOne(id);
  }
  @Get(':id/responses')
  @ApiOperation({ summary: '특정 지원 폼의 모든 응답 가져오기' })
  findAllResponses(@Param('id') id: number) {
    // 특정 지원 폼의 응답 조회하기
    return this.applyFormService.findAllResponses(id);
  }
  @Get('responses/:responseId')
  @ApiOperation({ summary: '특정 지원 폼의 특정 응답 가져오기' })
  findOneResponse(@Param('responseId') responseId: string) {
    // 특정 지원 폼의 특정 응답 조회하기
    return this.applyFormService.findOneResponse(responseId);
  }
  @Post(':id/activate')
  @ApiOperation({ summary: '지원 폼 활성화' })
  activateForm(@Param('id') id: number) {
    return this.applyFormService.activateForm(id);
  }
  @Post(':id/deactivate')
  @ApiOperation({ summary: '지원 폼 비활성화' })
  deactivateForm(@Param('id') id: number) {
    return this.applyFormService.deactivateForm(id);
  }
}
