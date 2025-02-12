import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
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
  async findActiveForm() {
    return this.applyFormService.getActiveForm();
  }
  @Post(':id/response')
  async createResponse(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }, @Body() createResponseDto: CreateFormResponseDto) {
    return this.applyFormService.createResponse(id, req.user.uuid, createResponseDto);
  }
  @Get(':id/response')
  async findResponse(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }) {
    return this.applyFormService.findResponse(id, req.user.uuid);
  }
  @Patch(':id/response')
  async updateResponse(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }, @Body() updateFormResponseDto: UpdateFormResponseDto) {
    return this.applyFormService.updateResponse(id, req.user.uuid, updateFormResponseDto);
  }
  @Post(':id/response/apply')
  async applyForm(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }) {
    return this.applyFormService.submitResponse(id, req.user.uuid);
  }
  @Delete(':id/response')
  async removeResponse(@Param('id') id: number, @Req() req: Response & {
    user: Member;
  }) {
    return this.applyFormService.removeResponse(id, req.user.uuid);
  }
  @Get(':id/accessibility')
  async isAvailableToAccessForm(@Param('id') id: number) {
    return this.applyFormService.isAvailableToAccessForm(id);
  }
}

