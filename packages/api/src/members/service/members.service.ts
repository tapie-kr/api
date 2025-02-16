import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from '@/members/dto/create.dto';
import { MemberPublicOnlyDto } from '@/members/dto/member.dto';
import { GetMemberMethod } from '@/members/enums/member.enum';
import { MemberRepository } from '@/members/repository/member.repository';

@Injectable()
export class MembersService {
  constructor(private readonly memberRepository: MemberRepository) {
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
  async createMember(data: CreateMemberDto) {
    return this.memberRepository.createMember(data);
  }
  async getAllMembers(options: {
    publicOnly: boolean;
  }) {
    const members = await this.memberRepository.getAllMembers();

    if (options.publicOnly) {
      return members.map(member => {
        return {
          uuid:       member.uuid,
          name:       member.name,
          username:   member.username,
          role:       member.role,
          unit:       member.unit,
          profileUri: '',
        } as MemberPublicOnlyDto;
      });
    }
  }
}
