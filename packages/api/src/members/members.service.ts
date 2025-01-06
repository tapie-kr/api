import { Injectable } from '@nestjs/common'
import { MemberRepository } from './repository/member.repository'
import { MemberMethod } from './enums/member.enum'

@Injectable()
export class MembersService {
  constructor(
    private readonly memberRepository: MemberRepository,
  ) {}

  async getMember(method: MemberMethod, value: string) {
    switch (method) {
      case MemberMethod.UUID:
        return this.memberRepository.getMember(value)
      case MemberMethod.USERNAME:
        return this.memberRepository.getMemberByUsername(value)
      case MemberMethod.GOOGLE_EMAIL:
        return this.memberRepository.getMemberByGoogleEmail(value)
    }
  }
}
