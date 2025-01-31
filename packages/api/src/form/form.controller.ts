import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateApplyFormDto } from './dto/form.dto'
import { ApplyFormService } from './form.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@ApiTags('form')
@Controller('form')
export class ApplyFormController {
  constructor(private readonly applyFormService: ApplyFormService) {}

  @Post()
  @ApiOperation({ summary: '지원서 생성' })
  @ApiResponse({ status: 201, description: '지원서가 성공적으로 생성됨' })
  create(@Body() createApplyFormDto: CreateApplyFormDto) {
    return this.applyFormService.create(createApplyFormDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 지원서 조회' })
  findAll() {
    return this.applyFormService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  @ApiOperation({ summary: '특정 지원서 조회' })
  findOne(@Param('uuid') uuid: string) {
    return this.applyFormService.findOne(uuid);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: '지원서 삭제' })
  remove(@Param('uuid') uuid: string) {
    return this.applyFormService.remove(uuid);
  }
}
