import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AssetService } from '@/asset/asset.service';
import { FileType } from '@/asset/types/fileType';
import { decodeFileNameKorean } from '@/common/utils/string';
import { CreateMemberDto, MemberDto } from '@/members/dto/member.dto';
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
    }
  }
}
