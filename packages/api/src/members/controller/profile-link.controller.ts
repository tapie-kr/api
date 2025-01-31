import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, OmitType } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfileLinkService } from '../service/profile-link.service';
import {
  CreateProfileLinkDtoType,
  ProfileLinkDto,
  UpdateProfileLinkDtoType,
} from '../dto/profile-link.dto';

@Controller('profile/link')
@ApiTags('Profile Links')
export class ProfileLinkController {
  constructor(private readonly MemberProfileService: ProfileLinkService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '프로필 링크 생성', description: '새로운 프로필 링크를 생성합니다.' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['memberUUID', 'icon', 'label', 'href'],
      properties: {
        memberUUID: { type: 'string' },
        icon: { type: 'string' },
        label: { type: 'string' },
        href: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: '프로필 링크가 성공적으로 생성되었습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청입니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  async create(@Body() createDto: CreateProfileLinkDtoType) {
    return this.MemberProfileService.create(createDto);
  }

  @Get('/:memberId')
  @ApiOperation({
    summary: '프로필의 링크 조회',
    description: '특정 멤버의 모든 프로필 링크를 조회합니다.',
  })
  @ApiParam({ name: 'memberId', required: true, description: '조회할 멤버의 ID' })
  @ApiResponse({ status: 200, description: '프로필 링크 목록을 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '멤버를 찾을 수 없습니다.' })
  async findByMemberId(@Param('memberId') memberId: string) {
    return this.MemberProfileService.findByMemberId(memberId);
  }

  @Put(':id')
  //   @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '프로필 링크 수정',
    description: '기존 프로필 링크의 정보를 수정합니다.',
  })
  @ApiParam({ name: 'id', required: true, description: '수정할 프로필 링크의 고유 ID' })
  @ApiBody({ type: OmitType(ProfileLinkDto, ['memberUUID', 'id'] as const) })
  @ApiResponse({ status: 200, description: '프로필 링크가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청입니다.' })
  @ApiResponse({ status: 404, description: '프로필 링크를 찾을 수 없습니다.' })
  async update(@Param('id') id: number, @Body() updateDto: UpdateProfileLinkDtoType) {
    console.log('id', id);
    return this.MemberProfileService.update(id, updateDto);
  }

  @Delete(':id')
  //   @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '프로필 링크 삭제', description: '프로필 링크를 삭제합니다.' })
  @ApiParam({ name: 'id', required: true, description: '삭제할 프로필 링크의 고유 ID' })
  @ApiResponse({ status: 200, description: '프로필 링크가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청입니다.' })
  @ApiResponse({ status: 404, description: '프로필 링크를 찾을 수 없습니다.' })
  async delete(@Param('id') id: number) {
    return this.MemberProfileService.delete(id);
  }
}
