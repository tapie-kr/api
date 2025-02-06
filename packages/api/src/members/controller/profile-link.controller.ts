import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { type CreateProfileLinkDtoType, type UpdateProfileLinkDtoType } from '@/members/dto/profile-link.dto';
import { type ProfileLinkService } from '@/members/service/profile-link.service';

@Controller('profile/link')
export class ProfileLinkController {
  constructor(private readonly MemberProfileService: ProfileLinkService) {
  }
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

    return this.MemberProfileService.update(id, updateDto);
  }
  @Delete(':id')

  //   @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number) {
    // 특정 프로필 링크 삭제
    return this.MemberProfileService.delete(id);
  }
}
