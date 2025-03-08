import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AssetService } from '@/asset/asset.service';
import { FileType } from '@/asset/types/fileType';
import { KSTDate } from '@/common/utils/date';
import { decodeFileNameKorean } from '@/common/utils/string';
import {
  CreateMemberDto,
  MemberDto,
  SpecificDetailMemberDto,
  UpdateMemberDto,
} from '@/members/dto/member.dto';
import { CreateMemberLinkDto, UpdateMemberLinkDto } from '@/members/dto/member-link.dto';
import { ConnectSkillDto, CreateMemberSkillDto, UpdateMemberSkillDto } from '@/members/dto/member-skill.dto';
import { GetMemberMethod } from '@/members/enums/member.enum';
import { MemberRepository } from '@/members/repository/member.repository';
import { SkillRepository } from '@/members/repository/skill.repository';

@Injectable()
export class MembersService {
  constructor(private readonly memberRepository: MemberRepository,
    private readonly skillRepository: SkillRepository,
    private readonly minioService: AssetService) {
  }
  private generateFilename(originalName: string): string {
    const extension = originalName.split('.').pop();

    return `${uuidv4()}.${extension}`;
  }
  private getDefaultUsername(uuid: string): string {
    return `unknown-${uuid.slice(0, 8)}`;
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
  async searchMembers(options: {
    username: string;
  }) {
    const member = await this.getMember(GetMemberMethod.USERNAME, options.username);

    if (!member) {
      throw new BadRequestException('멤버를 찾을 수 없습니다.');
    }

    return member;
  }
  async getMemberWithData(uuid: string) {
    const member = await this.memberRepository.getMemberWithData(uuid);

    if (!member) {
      throw new BadRequestException('멤버를 찾을 수 없습니다.');
    }

    const currentYear = (new KSTDate).getFullYear();
    const highSchoolSecondYearGeneration = 119;
    const isGraduated = member.generation <= highSchoolSecondYearGeneration - (currentYear - 2024);
    const profileAssetPath = member.profile ? member.profile.path : 'profile/default.png';

    return {
      uuid:        member.uuid,
      name:        member.name,
      username:    member.username  || this.getDefaultUsername(member.uuid),
      permissions: member.permissions,
      isGraduated: isGraduated,
      studentID:   member.studentID,
      googleEmail: member.googleEmail,
      role:        member.role,
      unit:        member.unit,
      generation:  member.generation,
      profileUri:  this.minioService.buildPublicUrl(profileAssetPath),
      links:       member.links,
      awards:      member.awards,
      skills:      member.skills,
      history:     member.history,
    } satisfies SpecificDetailMemberDto;
  }
  async createMember(data: CreateMemberDto) {
    return this.memberRepository.createMember(data);
  }
  async updateMember(uuid: string, data: UpdateMemberDto) {
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
          uuid:        member.uuid,
          name:        member.name,
          studentID:   member.studentID,
          username:    member.username || this.getDefaultUsername(member.uuid),
          role:        member.role,
          unit:        member.unit,
          generation:  member.generation,
          googleEmail: member.googleEmail,
          profileUri:  this.minioService.buildPublicUrl(profileAssetPath),
        } satisfies MemberDto;
      });
    } else {
      return members.map(member => {
        const profileAssetPath = member.profile ? member.profile.path : 'profile/default.png';

        return {
          uuid:        member.uuid,
          name:        member.name,
          username:    member.username  || this.getDefaultUsername(member.uuid),
          studentID:   member.studentID,
          googleEmail: member.googleEmail,
          role:        member.role,
          unit:        member.unit,
          generation:  member.generation,
          profileUri:  this.minioService.buildPublicUrl(profileAssetPath),

        } satisfies MemberDto;
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
  async skillConnector(data: ConnectSkillDto) {
    if (data.uuid && data.name) {
      throw new BadRequestException('스킬을 연결하거나 새로운 스킬을 만드는 것 중 하나만 선택해야 합니다.');
    }

    if (data.uuid) {
      return this.skillRepository.getSkill(data.uuid);
    }

    if (data.name) {
      return this.skillRepository.createSkill({
        icon: data.icon,
        name: data.name,
        type: data.type,
      });
    }

    throw new BadRequestException('유효한 스킬 정보를 제공해야 합니다.');
  }
  async addMemberSkill(uuid: string, data: CreateMemberSkillDto) {
    const skill = await this.skillConnector(data.skill);

    return this.skillRepository.addMemberSkill(uuid, {
      ...data, skillUUID: skill.uuid,
    });
  }
  async updateMemberSkill(uuid: string, skillId: string, data: UpdateMemberSkillDto) {
    const updateAvailable = await this.skillRepository.hasSkill(uuid, skillId);

    if (!updateAvailable) {
      throw new BadRequestException('스킬을 찾을 수 없습니다');
    }

    return this.skillRepository.updateMemberSkill(skillId, data);
  }
  async removeMemberSkill(uuid: string, skillId: string) {
    const deleteAvailable = await this.skillRepository.hasSkill(uuid, skillId);

    if (!deleteAvailable) {
      throw new BadRequestException('스킬을 찾을 수 없습니다');
    }

    return this.skillRepository.removeMemberSkill(uuid, skillId);
  }
}
