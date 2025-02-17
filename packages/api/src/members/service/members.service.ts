import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AssetService } from '@/asset/asset.service';
import { FileType } from '@/asset/types/fileType';
import { decodeFileNameKorean } from '@/common/utils/string';
import { CreateMemberDto, MemberDto } from '@/members/dto/member.dto';
import { CreateMemberLinkDto, UpdateMemberLinkDto } from '@/members/dto/member-link.dto';
import { GetMemberMethod } from '@/members/enums/member.enum';
import { MemberRepository } from '@/members/repository/member.repository';

@Injectable()
export class MembersService {
  constructor(private readonly memberRepository: MemberRepository,
    private readonly minioService: AssetService) {
  }
  private generateFilename(originalName: string): string {
    const extension = originalName.split('.').pop();

    return `${uuidv4()}.${extension}`;
  }
  async getMember(method: GetMemberMethod, value: string) {
    switch (method) {
      case GetMemberMethod.UUID:
        return this.memberRepository.getMember(value);

      case GetMemberMethod.USERNAME:
        return this.memberRepository.getMemberByUsername(value);

      case GetMemberMethod.GOOGLE_EMAIL:
        return this.memberRepository.getMemberByGoogleEmail(value);
    }
  }
  async getMemberWithData(uuid: string) {
    const member = await this.memberRepository.getMemberWithData(uuid);

    if (!member) {
      throw new BadRequestException('멤버를 찾을 수 없습니다.');
    }

    return member;
  }
  async createMember(data: CreateMemberDto) {
    return this.memberRepository.createMember(data);
  }
  async updateMember(uuid: string, data: CreateMemberDto) {
    return this.memberRepository.updateMember(uuid, data);
  }
  async updateMemberProfileImage(uuid: string, file: Express.Multer.File) {
    const originalFileName = decodeFileNameKorean(file.originalname);
    const filename = this.generateFilename(originalFileName);

    const asset = await this.minioService.uploadFile(new File([file.buffer], originalFileName),
      filename,
      FileType.PROFILE_IMAGE,
      originalFileName);

    await this.memberRepository.updateMemberProfileImage(uuid, asset.uuid);

    return 'ok';
  }
  async deleteMemberProfileImage(uuid: string) {
    return this.memberRepository.deleteMemberProfileImage(uuid);
  }
  async getAllMembers(options: {
    publicOnly: boolean;
  }) {
    const members = await this.memberRepository.getAllMembers();

    if (options.publicOnly) {
      return members.map(member => {
        const profileAssetPath = member.profile ? member.profile.path : 'profile/default.png';

        return {
          uuid:       member.uuid,
          name:       member.name,
          username:   member.username,
          role:       member.role,
          unit:       member.unit,
          profileUri: this.minioService.buildPublicUrl(profileAssetPath),
        } as MemberDto;
      });
    } else {
      return members.map(member => {
        const profileAssetPath = member.profile ? member.profile.path : 'profile/default.png';

        return {
          uuid:        member.uuid,
          name:        member.name,
          username:    member.username,
          googleEmail: member.googleEmail,
          role:        member.role,
          unit:        member.unit,
          profileUri:  this.minioService.buildPublicUrl(profileAssetPath),

        } as MemberDto;
      });
    }
  }
  async addLink(uuid: string, data: CreateMemberLinkDto) {
    return this.memberRepository.addLink(uuid, data);
  }
  async removeLink(uuid: string, linkId: number) {
    const deleteAvailable = await this.memberRepository.hasLink(uuid, linkId);

    if (!deleteAvailable) {
      throw new BadRequestException('링크를 찾을 수 없습니다');
    }

    return this.memberRepository.removeLink(uuid, linkId);
  }
  async updateLink(uuid: string, linkId: number, data: UpdateMemberLinkDto) {
    const updateAvailable = await this.memberRepository.hasLink(uuid, linkId);

    if (!updateAvailable) {
      throw new BadRequestException('링크를 찾을 수 없습니다');
    }

    return this.memberRepository.updateLink(uuid, linkId, data);
  }
}
