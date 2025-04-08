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
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
