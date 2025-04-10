import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { AuthorizedRequest } from '@/types/request';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('accounts')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AccountsController {
	@Get('me')
	getMe(@Req() req: AuthorizedRequest) {
		return req.account;
	}
}
