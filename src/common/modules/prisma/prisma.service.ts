import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(private readonly configService: ConfigService) {
		super({
			omit: { user: { password: true } },
			datasources: { db: { url: configService.get<string>('DATABASE_URL') } },
		});
	}
}
