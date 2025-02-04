import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfileLinkService } from '../service/profile-link.service';
import {
  CreateProfileLinkDtoType,
  ProfileLinkDto,
  UpdateProfileLinkDtoType,
} from '../dto/profile-link.dto';

@Controller('profile/link')
export class ProfileLinkController {
  constructor(private readonly MemberProfileService: ProfileLinkService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createDto: CreateProfileLinkDtoType) {
    // 새로운 프로필 링크 생성
    return this.MemberProfileService.create(createDto);
  }

  @Get('/:memberId')
  async findByMemberId(@Param('memberId') memberId: string) {
    // 특정 멤버의 모든 프로필 링크 조회
    return this.MemberProfileService.findByMemberId(memberId);
  }

  @Put(':id')
  //   @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updateDto: UpdateProfileLinkDtoType) {
    // 프로필 링크 수정
    console.log('id', id);
    return this.MemberProfileService.update(id, updateDto);
  }

  @Delete(':id')
  //   @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number) {
    // 특정 프로필 링크 삭제
    return this.MemberProfileService.delete(id);
  }
}
