import { GetMemberMethod } from '@api/members/enums/member.enum';
import { type MemberRepository } from '@api/members/repository/member.repository';
import { Injectable } from '@nestjs/common';

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
}
