import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { GetMemberMethod } from '@/members/enums/member.enum';
import { MembersService } from '@/members/service/members.service';

const logger = new Logger('UserAuthGuard');

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
      request.user = await this.membersService.getMember(GetMemberMethod.UUID, jwtPayload.id);
    } catch (error) {
      logger.error(error);

      throw new UnauthorizedException('Inaccessible scope');
    }

    return true;
  }
}
