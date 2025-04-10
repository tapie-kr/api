import { AuthorizedRequest } from '@/types/request';
import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { AccountsService } from '../accounts.service';

@Injectable()
export class AccountInterceptor implements NestInterceptor {
	constructor(private readonly accountService: AccountsService) {}

	async intercept(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest<AuthorizedRequest>();
		const uuid = request.params.uuid;

		if (!uuid) {
			throw new BadRequestException('UUID가 필요합니다.');
		}

		request.account = await this.accountService.getAccount(uuid);
		return next.handle();
	}
}
