import {
  Controller,
  Get,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { AwardPublicPreviewDto } from '@/portfolio/dto/award.dto';
import { PortfolioService } from '@/portfolio/service/portfolio.service';

@Controller('portfolio')
@ApiExtraModels(AwardPublicPreviewDto)
export class PortfolioPublicController {
  constructor(private readonly portfolioService: PortfolioService) {
  }
  @Get('awards')
  @ApiOperation({
    summary:     '모든 대회 수상 가져오기 (메인 페이지용)',
    description: 'year Query가 Swagger 버그로 required로 되어 있습니다. year Query는 optional입니다.',
  })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(AwardPublicPreviewDto) },
  })
  async getAllAwards(@Query('year') year?: number) {
    return this.portfolioService.getAllAwards({
      publicOnly: true, filterByYear: year,
    });
  }
}

