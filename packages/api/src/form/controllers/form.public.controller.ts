import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CreateApplyFormDto } from '@/form/dto/form.dto';
import { ApplyFormService } from '@/form/form.service';

@Controller('form')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('accessToken')
export class ApplyFormController {
  constructor(private readonly applyFormService: ApplyFormService) {
  }
  @Post()
  @ApiOperation({
    summary: '지원 폼 생성', description: '지원 폼을 생성합니다. (응답 생성 X)',
  })
  create(@Body() createFormDto: CreateApplyFormDto) {
    return this.applyFormService.create(createFormDto);
  }
}
