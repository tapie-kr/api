import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getAccount(uuid: string) {
		return this.prisma.account.findUnique({
			where: { uuid },
			include: { permission: true },
		});
	}
}
