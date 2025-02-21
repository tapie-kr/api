import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { AddMemberAwardDto, AwardDto, CreateAwardDto } from '@/portfolio/dto/award.dto';
import { PortfolioService } from '@/portfolio/service/portfolio.service';

@Controller('admin/portfolio')
@UseGuards(UserAuthGuard, PermissionGuard)
@RequirePermissions(P.AWARDS_MANAGE)
@ApiExtraModels(AwardDto)
export class PortfolioPrivateController {
  constructor(private readonly portfolioService: PortfolioService) {
  }
  @Get('awards')
  @ApiOperation({ summary: '모든 대회 수상 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(AwardDto) },
  })
  async getAllAwards() {
    return this.portfolioService.getAllAwards({ publicOnly: false });
  }
  @Post('awards')
  @ApiOperation({
    summary:     '수상 추가',
    description: 'competition field는 기존 competition을 연결하려면 uuid, 새로운 competition을 만들려면 name을 입력하세요.' +
      ' membersUUID field는 수상 멤버의 uuid를 입력하면 됩니다.',
  })
  async createAward(@Body() createAwardDto: CreateAwardDto) {
    return this.portfolioService.createAward(createAwardDto);
  }
  @Delete('awards/:uuid')
  @ApiOperation({ summary: '수상 삭제' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAward(@Param('uuid') awardUUID: string) {
    await this.portfolioService.deleteAward(awardUUID);
  }
  @Post('awards/:uuid/members')
  @ApiOperation({ summary: '수상 멤버 추가' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async addMembersToAward(@Param('uuid') awardUUID: string, @Body() addMemberAwardDto: AddMemberAwardDto) {
    await this.portfolioService.addMembersToAward(awardUUID, addMemberAwardDto.membersUUID);
  }
  @Delete('awards/:uuid/members/:memberUUID')
  @ApiOperation({ summary: '수상 멤버 삭제' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMemberFromAward(@Param('uuid') awardUUID: string, @Param('memberUUID') memberUUID: string) {
    return this.portfolioService.deleteMemberFromAward(awardUUID, memberUUID);
  }
  @Get('competitions')
  @ApiOperation({ summary: '모든 대회 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(AwardDto) },
  })
  async getAllCompetitions() {
    return this.portfolioService.getAllCompetitions();
  }
  @Get('competitions/:competitionUUUID')
  @ApiOperation({ summary: '대회별 수상 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(AwardDto) },
  })
  async getAwardsByCompetition(@Param('competitionUUUID') competitionUUID: string) {
    return this.portfolioService.getAwardsByCompetition(competitionUUID);
  }
  @Delete('competitions/:competitionUUUID')
  @ApiOperation({ summary: '대회 삭제' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompetition(@Param('competitionUUUID') competitionUUID: string) {
    await this.portfolioService.deleteCompetition(competitionUUID);
  }
}
