import { Controller, Get } from '@nestjs/common';
import { MembersService } from '@/members/service/members.service';

@Controller('members')
export class MemberPublicController {
  constructor(private readonly membersService: MembersService) {
  }
  @Get()
  async getAllMembers() {
    return this.membersService.getAllMembers({ publicOnly: true });
  }
}

