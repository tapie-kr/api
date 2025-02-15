import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { GetMemberMethod } from '@/members/enums/member.enum';
import { MembersService } from '@/members/service/members.service';

@Injectable()
export class UserAuthGuard extends JwtAuthGuard {
  private membersService: MembersService;

  constructor(private moduleRef: ModuleRef) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isValid = await super.canActivate(context);

    this.membersService = await this.moduleRef.resolve(MembersService);

    if (!isValid) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const jwtPayload = request.user;

    try {
      const member = await this.membersService.getMember(GetMemberMethod.UUID, jwtPayload.id);

      if (!member) {
        throw new UnauthorizedException('Unauthorized');
      }

      request.user = member;
    } catch (_error) {
      throw new UnauthorizedException('Inaccessible scope');
    }

    return true;
  }
}
