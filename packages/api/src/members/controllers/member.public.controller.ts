import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { PublicOnlyMemberDto } from '@/members/dto/member.dto';
import { MembersService } from '@/members/service/members.service';

@Controller('members')
@ApiExtraModels(PublicOnlyMemberDto)
export class MemberPublicController {
  constructor(private readonly membersService: MembersService) {
  }
  @Get()
  @ApiOperation({ summary: '모든 멤버 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(PublicOnlyMemberDto) },
  })
  async getAllMembers() {
    return this.membersService.getAllMembers({ publicOnly: true });
  }
}

