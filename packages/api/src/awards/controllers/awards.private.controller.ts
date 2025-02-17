import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { AwardDto, CreateAwardDto } from '@/awards/dto/award.dto';
import { AwardsService } from '@/awards/service/awards.service';
import { Permissions as P } from '@/common/utils/permissions';
import { ApiCommonResponse } from '@/common/utils/swagger';

@Controller('admin/awards')
@RequirePermissions(P.AWARDS_MANAGE)
@UseGuards(UserAuthGuard, PermissionGuard)
@ApiExtraModels(AwardDto)
export class AwardsPrivateController {
  constructor(private readonly awardsService: AwardsService) {
  }
  @Get()
  @ApiOperation({ summary: '모든 대회 수상 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(AwardDto) },
  })
  async getAllAwards() {
    return this.awardsService.getAllAwards({ publicOnly: false });
  }
  @Post()
  @ApiOperation({
    summary:     '수상 추가',
    description: 'competition field는 기존 competition을 연결하려면 uuid, 새로운 competition을 만들려면 name을 입력하세요.' +
      ' membersUUID field는 수상 멤버의 uuid를 입력하면 됩니다.',
  })
  async createAward(@Body() createAwardDto: CreateAwardDto) {
    return this.awardsService.createAward(createAwardDto);
  }
  @Post(':uuid/members')
  @ApiOperation({ summary: '수상 멤버 추가' })
  async addMembersToAward(@Param('uuid') awardUUID: string, @Body() membersUUID: string[]) {
    return this.awardsService.addMembersToAward(awardUUID, membersUUID);
  }
}
