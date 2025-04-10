import { AuthService } from '@/modules/auth/auth.service';
import { AuthorizedRequest } from '@/types/request';
import { Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { AccountInterceptor } from '../interceptors/account-detail.interceptor';

@Controller('accounts/:uuid')
@UseInterceptors(AccountInterceptor)
@ApiParam({
	name: 'uuid',
	required: true,
	type: 'string',
})
export class AccountDetailController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	async getAccountDetail(@Req() req: AuthorizedRequest) {
		return req.account;
	}

	@Post('tokens')
	async generateToken(@Req() req: AuthorizedRequest) {
		return this.authService.generateToken(req.account.uuid);
	}
}
