import { MemberUnit, PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

async function main() {
	for (const path of ['.env', '.env.development', '.env.local']) {
		dotenv.config({ path, override: true });
	}

	const prisma = new PrismaClient();

	await prisma.$connect();

	await prisma.$transaction(async (prisma) => {
		const account = await prisma.account.create({
			data: {
				email: 'test@tapie.kr',
				name: '홍길동',
			},
		});
		await prisma.member.create({
			data: {
				cohort: 1,
				unit: MemberUnit.DEVELOPER,
				account: { connect: { uuid: account.uuid } },
			},
		});
		await prisma.permission.create({
			data: {
				root: true,
				target: { connect: { uuid: account.uuid } },
			},
		});
	});

	await prisma.$disconnect();
}

main().catch((e) => {
	if (e instanceof Error) {
		console.error(e.name);
		console.error(e.message);
	}
});
