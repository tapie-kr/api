import { Injectable } from '@nestjs/common';
import { CreateProfileLinkDto } from '../dto/create-profile-link.dto';
import { ProfileLinkRepository } from '../repository/profile-link.repository';

@Injectable()
export class ProfileLinkService {
  constructor(private readonly MemberProfileRepository: ProfileLinkRepository) {}

  async create(createDto: CreateProfileLinkDto) {
    return this.MemberProfileRepository.create(createDto);
  }

  async findByMemberId(memberId: string) {
    return this.MemberProfileRepository.findByMemberId(memberId);
  }

  async update(updateDto: Partial<CreateProfileLinkDto>) {
    return this.MemberProfileRepository.update(updateDto);
  }

  async delete(id: number) {
    return this.MemberProfileRepository.delete(id);
  }
}
