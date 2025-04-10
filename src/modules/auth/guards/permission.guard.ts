import { AuthorizedRequest } from '@/types/request';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	Logger,
} from '@nestjs/common';
import { PermissionTarget, PermissionType } from '../enums/permission.enum';
import { hasPermission } from '../utils/permission';

@Injectable()
export class PermissionsGuard implements CanActivate {
	private requiredPermissions: {
		target: PermissionTarget;
		type: PermissionType;
	}[];
	private readonly logger = new Logger(PermissionsGuard.name);

	constructor(
		...permissions: { target: PermissionTarget; type: PermissionType }[]
	) {
		this.requiredPermissions = permissions;
	}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<AuthorizedRequest>();
		const permission = request.account.permission;

		if (!permission) {
			throw new ForbiddenException('권한 정보가 없습니다.');
		}

		if (permission.root) {
			this.logger.verbose(
				`Permission check skipped for root user: ${request.account.email}`,
			);
			return true;
		}

		const hasAllPermissions = this.requiredPermissions.every(
			({ target, type }) => hasPermission(permission.flags, target, type),
		);

		if (!hasAllPermissions) {
			throw new ForbiddenException('권한이 없습니다.');
		}

		return true;
	}
}
