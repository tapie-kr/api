import {
  BadRequestException,
  Controller,
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
import { MembersService } from '@/members/service/members.service';

@Controller('admin/members')
@RequirePermissions(P.MEMBER_MANAGE)
@UseGuards(UserAuthGuard, PermissionGuard)
@ApiExtraModels(MemberDto)
export class MemberPrivateController {
  constructor(private readonly membersService: MembersService) {
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
  @Post()
  @ApiOperation({ summary: '새 멤버 만들기' })
  async createMember(createMemberDto: CreateMemberDto) {
    return this.membersService.createMember(createMemberDto);
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
    return this.membersService.updateMemberProfileImage(uuid, file);
  }
}

