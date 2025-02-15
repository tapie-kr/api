import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { GetMemberMethod } from '@/members/enums/member.enum';
import { MembersService } from '@/members/service/members.service';

@Injectable()
export class UserAuthGuard extends JwtAuthGuard {
  constructor(private readonly membersService: MembersService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isValid = await super.canActivate(context);

    if (!isValid) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const jwtPayload = request.user;
    const member = await this.membersService.getMember(GetMemberMethod.UUID, jwtPayload.id);

    if (!member) {
      throw new UnauthorizedException('Unauthorized');
    }

    request.user = member;

    return true;
  }
}
