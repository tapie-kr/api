import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from '@/members/dto/create.dto';
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
}
