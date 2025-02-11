import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApplyFormService } from '@/form/form.service';

@Controller('form')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('accessToken')
export class ApplyFormPublicController {
  constructor(private readonly applyFormService: ApplyFormService) {
  }
  @Get('active')
  @ApiOperation({ summary: '활성화된 지원 폼 가져오기' })
  getActiveForm() {
    return this.applyFormService.getActiveForm();
  }
}
