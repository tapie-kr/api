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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { type CreateApplyFormDto, type UpdateApplyFormDto } from './dto/form.dto';
import { type ApplyFormService } from './form.service';

@UseGuards(JwtAuthGuard)
@Controller('form')
export class ApplyFormController {
  constructor(private readonly applyFormService: ApplyFormService) {
  }
  @Post()
  create(@Body() createFormDto: CreateApplyFormDto) {
    // 지원 폼 생성하기
    return this.applyFormService.create(createFormDto);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFormDto: UpdateApplyFormDto) {
    // 지원 폼 수정하기
    return this.applyFormService.update(id, updateFormDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    // 지원 폼 삭제하기
    return this.applyFormService.remove(id);
  }
  @Get()
  findAll() {
    // 모든 지원 폼 조회하기
    return this.applyFormService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    // 특정 지원 폼 조회하기
    return this.applyFormService.findOne(id);
  }
  @Get(':id/responses')
  findAllResponses(@Param('id') id: number) {
    // 특정 지원 폼의 응답 조회하기
    return this.applyFormService.findAllResponses(id);
  }
}
