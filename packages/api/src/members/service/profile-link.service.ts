import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileLinkDtoType, UpdateProfileLinkDtoType } from '@/members/dto/profile-link.dto';
import { ProfileLinkRepository } from '@/members/repository/profile-link.repository';

@Injectable()
export class ProfileLinkService {
  constructor(private readonly MemberProfileRepository: ProfileLinkRepository) {
  }
  async create(createDto: CreateProfileLinkDtoType) {
    try {
      return await this.MemberProfileRepository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('이미 존재하는 [label, href] 조합입니다');
      }

      throw new InternalServerErrorException(error.name);
    }
  }
  async findByMemberId(memberId: string) {
    return this.MemberProfileRepository.findByMemberId(memberId);
  }
  async update(id: number, updateDto: UpdateProfileLinkDtoType) {
    try {
      return await this.MemberProfileRepository.update(id, updateDto);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('프로필 링크를 찾을 수 없습니다');
      } else {
        throw new InternalServerErrorException(error.name);
      }
    }
  }
  async delete(id: number) {
    try {
      await this.MemberProfileRepository.delete(id);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('프로필 링크를 찾을 수 없습니다');
      } else {
        throw new InternalServerErrorException(error.name);
      }
    }
  }
}
