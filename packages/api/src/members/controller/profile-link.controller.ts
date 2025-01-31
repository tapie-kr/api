import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateProfileLinkDto } from '../dto/create-profile-link.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfileLinkService } from '../service/profile-link.service';

@Controller('profile/link')
@ApiTags('Profile Links')
export class MemberProfileController {
  constructor(private readonly MemberProfileService: ProfileLinkService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '프로필 링크 생성' })
  async create(@Body() createDto: CreateProfileLinkDto) {
    return this.MemberProfileService.create(createDto);
  }

  @Get('/:memberId')
  @ApiOperation({ summary: '프로필의 링크 조회' })
  async findByMemberId(@Param('memberId') memberId: string) {
    return this.MemberProfileService.findByMemberId(memberId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '프로필 링크 수정' })
  async update(@Body() updateDto: Partial<CreateProfileLinkDto>) {
    return this.MemberProfileService.update(updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '프로필 링크 삭제' })
  async delete(@Param('id') id: number) {
    return this.MemberProfileService.delete(id);
  }
}
