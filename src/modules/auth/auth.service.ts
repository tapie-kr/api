import { generateRandomString } from '@/common/utils/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import {
	HttpException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import Redis from 'ioredis';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
	private readonly redis: Redis;

	constructor(
		private readonly redisService: RedisService,
		private readonly authRepository: AuthRepository,
	) {
		this.redis = this.redisService.getOrThrow();
	}

	async validateToken(token: string) {
		const accountUUID = (await this.redis.get(`token:${token}`)) || '';
		const account = await this.authRepository.getAccount(accountUUID);
		if (!account) {
			throw new UnauthorizedException('유효하지 않은 토큰입니다.');
		}

		return account;
	}

	async generateToken(accountUUID: string) {
		const existTokenCount = await this.redis.scard(`account:${accountUUID}`);
		if (existTokenCount >= 5) {
			throw new HttpException('토큰은 최대 5개까지 생성할 수 있습니다.', 429);
		}

		const token = generateRandomString(64);

		const transaction = this.redis.multi();
		const ONE_DAY = 60 * 60 * 24;

		transaction.set(`token:${token}`, accountUUID, 'EX', ONE_DAY);
		transaction.sadd(`account:${accountUUID}`, token);
		transaction.expire(`account:${accountUUID}`, ONE_DAY);

		await transaction.exec();

		return token;
	}
}
