import {
  Controller,
  Get,
  HttpStatus,
  NotImplementedException,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { AwardPublicMainPreviewDto } from '@/portfolio/dto/award.dto';
import { PortfolioService } from '@/portfolio/service/portfolio.service';

@Controller('portfolio')
@ApiExtraModels(AwardPublicMainPreviewDto)
export class PortfolioPublicController {
  constructor(private readonly portfolioService: PortfolioService) {
  }
  @Get('awards/main')
  @ApiOperation({
    summary:     '모든 대회 수상 가져오기 (메인 페이지용)',
    description: 'year Query가 Swagger 버그로 required로 되어 있습니다. year Query는 optional입니다.',
  })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(AwardPublicMainPreviewDto) },
  })
  async getAllAwards(@Query('year') year?: number) {
    return this.portfolioService.getAllAwards({
      publicOnly: true, filterByYear: year,
    });
  }
  @Get('awards/detail')
  @ApiOperation({
    summary: '모든 대회 수상 가져오기 (상세 페이지용)', deprecated: true,
  })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(AwardPublicMainPreviewDto) },
  })
  async getAllAwardsDetail() {
    throw new NotImplementedException('Not implemented yet.');
  }
}

