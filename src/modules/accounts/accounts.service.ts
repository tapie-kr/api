import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountsRepository } from './repositories/accounts.repository';

@Injectable()
export class AccountsService {
	constructor(private readonly accountRepository: AccountsRepository) {}

	async getAccount(uuid: string) {
		const account = await this.accountRepository.getAccount(uuid);
		if (!account || account.deletedAt) {
			throw new NotFoundException('계정을 찾을 수 없습니다.');
		}

		return account;
	}
}
