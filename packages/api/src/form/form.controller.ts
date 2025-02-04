import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApplyFormDto } from './dto/form.dto';
import { ApplyFormService } from './form.service';
import { FindFormsQueryDto } from './dto/find-form-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('form')
export class ApplyFormController {
  constructor(private readonly applyFormService: ApplyFormService) {}

  @Post()
  create(@Body() createApplyFormDto: ApplyFormDto) {
    // 지원서 생성하기
    return this.applyFormService.create(createApplyFormDto);
  }

  @Get()
  findAll(@Query() query: FindFormsQueryDto) {
    // 모든 지원서 조회하기
    return this.applyFormService.findAll(query);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    // 특정 지원서 조회하기
    return this.applyFormService.findOne(uuid);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    // 특정 지원서 삭제하기
    return this.applyFormService.remove(uuid);
  }
}
