import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '@/auth/decorators/permission.decorator';
import { PermissionCore } from '@/common/utils/permissions';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<number>(PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || typeof user.permissions !== 'number') {
      throw new UnauthorizedException('Unauthorized');
    }

    const hasPermission = PermissionCore.hasPermission(user.permissions,
      requiredPermissions);

    if (!hasPermission) {
      throw new UnauthorizedException('권힌이 없습니다.');
    }

    return true;
  }
}
