import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { Response } from 'express';
import { RequirePermissions } from '@/auth/decorators/permission.decorator';
import { MemberPayloadDto } from '@/auth/dto/member-payload.dto';
import { PermissionGuard } from '@/auth/guards/permission.guard';
import { UserAuthGuard } from '@/auth/guards/user-auth.guard';
import { Permissions as P } from '@/common/utils/permissions';
import { ApiCommonResponse } from '@/common/utils/swagger';
import { CreateMemberDto, MemberDto, SpecificMemberDto } from '@/members/dto/member.dto';
import { CreateMemberLinkDto, UpdateMemberLinkDto } from '@/members/dto/member-link.dto';
import { CreateMemberSkillDto, MemberSkillDto, UpdateMemberSkillDto } from '@/members/dto/member-skill.dto';
import { MembersService } from '@/members/service/members.service';

@Controller('admin/members')
@RequirePermissions(P.MEMBER_MANAGE)
@UseGuards(UserAuthGuard, PermissionGuard)
@ApiExtraModels(MemberDto,  MemberSkillDto)
export class MemberPrivateController {
  constructor(private readonly membersService: MembersService) {
  }
  @Post()
  @ApiOperation({ summary: '새 멤버 만들기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async createNewMember(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.createMember(createMemberDto);
  }
  @Get()
  @ApiOperation({ summary: '모든 멤버 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'array', items: { $ref: getSchemaPath(MemberDto) },
  })
  async getAllMembers() {
    return this.membersService.getAllMembers({ publicOnly: false });
  }
  @Get(':memberUUID')
  @ApiOperation({ summary: '특정 멤버 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(SpecificMemberDto) })
  async getMember(@Param('memberUUID') uuid: string) {
    return this.membersService.getMemberWithData(uuid);
  }
  @Patch(':memberUUID/profile')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: {
    type:       'object',
    properties: { file: {
      type:        'string',
      format:      'binary',
      description: '이미지 파일',
    } },
  } })
  @ApiOperation({ summary: '유저 프로필 이미지 수정하기' })
  @UseInterceptors(FileInterceptor('file', { fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      return callback(new BadRequestException('지원되지 않는 파일 형식입니다.'), false);
    }

    callback(null, true);
  } }))
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  async updateResponseFile(@Param('memberUUID') uuid: string, @Req() req: Response & {
    user: MemberPayloadDto;
  }, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('이미지 파일이 필요합니다.');
    }

    return this.membersService.updateMemberProfileImage(uuid, file);
  }
  @Delete(':memberUUID/profile')
  @ApiOperation({ summary: '유저 프로필 이미지 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  async deleteProfileImage(@Param('memberUUID') uuid: string) {
    return this.membersService.deleteMemberProfileImage(uuid);
  }
  @Patch(':memberUUID')
  @ApiOperation({ summary: '멤버 정보 수정하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async updateMember(@Param('memberUUID') uuid: string, @Body() updateMemberDto: CreateMemberDto) {
    return this.membersService.updateMember(uuid, updateMemberDto);
  }
  @Post(':memberUUID/links')
  @ApiOperation({ summary: '멤버 링크 추가하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async addLink(@Param('memberUUID') uuid: string, @Body() createMemberLink: CreateMemberLinkDto) {
    return this.membersService.addLink(uuid, createMemberLink);
  }
  @Patch(':memberUUID/links/:linkId')
  @ApiOperation({ summary: '멤버 링크 수정하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async updateLink(@Param('memberUUID') uuid: string, @Param('linkId') linkId: number, @Body() createMemberLink: UpdateMemberLinkDto) {
    return this.membersService.updateLink(uuid, linkId, createMemberLink);
  }
  @Delete(':memberUUID/links/:linkId')
  @ApiOperation({ summary: '멤버 링크 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async removeLink(@Param('memberUUID') uuid: string, @Param('linkId') linkId: number) {
    return this.membersService.removeLink(uuid, linkId);
  }
  @Post(':memberUUID/skills')
  @ApiOperation({
    summary: '멤버 기술 추가하기', description: 'skill을 연결하려면 uuid, 새로 생성하려면 uuid를 제외한 나머지 field를 채워서 제출하세요.',
  })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberSkillDto) })
  async addSkills(@Param('memberUUID') uuid: string, @Body() createMemberSkill: CreateMemberSkillDto) {
    return this.membersService.addMemberSkill(uuid, createMemberSkill);
  }
  @Patch(':memberUUID/skills/:skillUUID')
  @ApiOperation({ summary: '멤버 기술 수정하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberSkillDto) })
  async updateSkills(@Param('memberUUID') uuid: string, @Param('skillUUID') skillId: string, @Body() updateMemberSkillDto: UpdateMemberSkillDto) {
    return this.membersService.updateMemberSkill(uuid, skillId, updateMemberSkillDto);
  }
  @Delete(':memberUUID/skills/:skillUUID')
  @ApiOperation({ summary: '멤버 기술 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async removeSkills(@Param('memberUUID') uuid: string, @Param('skillUUID') skillId: string) {
    return this.membersService.removeMemberSkill(uuid, skillId);
  }
}

