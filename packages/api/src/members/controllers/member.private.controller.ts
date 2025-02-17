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
import { CreateMemberDto, MemberDto } from '@/members/dto/member.dto';
import { CreateMemberLinkDto, UpdateMemberLinkDto } from '@/members/dto/member-link.dto';
import { MembersService } from '@/members/service/members.service';

@Controller('admin/members')
@RequirePermissions(P.MEMBER_MANAGE)
@UseGuards(UserAuthGuard, PermissionGuard)
@ApiExtraModels(MemberDto)
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
  @Get(':uuid')
  @ApiOperation({ summary: '특정 멤버 가져오기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async getMember(@Param('uuid') uuid: string) {
    return this.membersService.getMemberWithData(uuid);
  }
  @Patch(':uuid/profile')
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
  async updateResponseFile(@Param('uuid') uuid: string, @Req() req: Response & {
    user: MemberPayloadDto;
  }, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('이미지 파일이 필요합니다.');
    }

    return this.membersService.updateMemberProfileImage(uuid, file);
  }
  @Delete(':uuid/profile')
  @ApiOperation({ summary: '유저 프로필 이미지 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  async deleteProfileImage(@Param('uuid') uuid: string) {
    return this.membersService.deleteMemberProfileImage(uuid);
  }
  @Patch(':uuid')
  @ApiOperation({ summary: '멤버 정보 수정하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async updateMember(@Param('uuid') uuid: string, @Body() updateMemberDto: CreateMemberDto) {
    return this.membersService.updateMember(uuid, updateMemberDto);
  }
  @Post(':uuid/links')
  @ApiOperation({ summary: '멤버 링크 추가하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async addLink(@Param('uuid') uuid: string, @Body() createMemberLink: CreateMemberLinkDto) {
    return this.membersService.addLink(uuid, createMemberLink);
  }
  @Patch(':uuid/links/:linkId')
  @ApiOperation({ summary: '멤버 링크 수정하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async updateLink(@Param('uuid') uuid: string, @Param('linkId') linkId: number, @Body() createMemberLink: UpdateMemberLinkDto) {
    return this.membersService.updateLink(uuid, linkId, createMemberLink);
  }
  @Delete(':uuid/links/:linkId')
  @ApiOperation({ summary: '멤버 링크 삭제하기' })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
  async removeLink(@Param('uuid') uuid: string, @Param('linkId') linkId: number) {
    return this.membersService.removeLink(uuid, linkId);
  }

  /*
   * @Post(':uuid/awards')
   * @ApiOperation({ summary: '멤버 수상 추가하기' })
   * @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberDto) })
   * async addAward(@Param('uuid') uuid: string, @Body() createMemberAward: CreateMemberAwardDto) {
   *   return this.membersService.addAward(uuid, createMemberAward);
   * }
   */
}

