import { AuthorizedRequest } from '@/types/request';
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<AuthorizedRequest>();
		const header = request.headers.authorization || '';
		const token = header?.split(' ')[1];

		if (!token) {
			throw new UnauthorizedException('토큰이 필요합니다.');
		}

		const account = await this.authService.validateToken(token);
		request.account = account;

		return true;
	}
}
