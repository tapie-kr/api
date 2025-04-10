import { AccountsModule } from '@/modules/accounts/accounts.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@sentry/nestjs/setup';
import { AppController } from './app.controller';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', '.env.local', '.env.development'],
		}),
		SentryModule.forRoot(),
		RedisModule.forRoot({
			config: {
				url: process.env.REDIS_URL,
			},
		}),

		AuthModule,
		AccountsModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
