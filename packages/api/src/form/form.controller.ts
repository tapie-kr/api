import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ApplyFormDto } from './dto/form.dto'
import { ApplyFormService } from './form.service'
import { FindFormsQueryDto } from './dto/find-form-query.dto'
import { MemberUnit } from '@tapie-kr/api-database/client'

@ApiTags('Form')
@Controller('form')
export class ApplyFormController {
  constructor(private readonly applyFormService: ApplyFormService) {}

  @Post()
  @ApiOperation({ summary: '지원서 생성' })
  @ApiResponse({ status: 201, description: '지원서가 성공적으로 생성됨' })
  create(@Body() createApplyFormDto: ApplyFormDto) {
    return this.applyFormService.create(createApplyFormDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 지원서 조회' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호 (기본값: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: '페이지당 항목 수 (기본값: 10)' })
  @ApiQuery({ name: 'name', required: false, type: String, description: '이름으로 검색' })
  @ApiQuery({ 
    name: 'unit', 
    required: false, 
    enum: MemberUnit,
    description: '지원 분야 필터링' 
  })
  @ApiResponse({
    status: 200,
    description: '지원서 목록 조회 성공',
    schema: {
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              uuid: { type: 'string' },
              name: { type: 'string' },
              unit: { type: 'string', enum: Object.values(MemberUnit) },
              googleEmail: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' }
            }
          }
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  })
  findAll(query: FindFormsQueryDto) {
    return this.applyFormService.findAll(query);
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
