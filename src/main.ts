import packageJson from '@/../package.json';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import initSentry from './configs/sentry';
import initSwagger from './configs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const logger = new Logger('bootstrap');
	const isProduction = configService.get('NODE_ENV') === 'production';

	app.useGlobalFilters(new GlobalExceptionFilter());
	app.useGlobalInterceptors(new TransformInterceptor());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	initSentry(configService);
	initSwagger(app);

	if (!isProduction && !configService.get('NO_REDIS_FLUSH')) {
		const redisService = app.get(RedisService);
		const redis = redisService.getOrThrow();

		redis.flushdb();

		logger.warn('Redis flushed before starting the application');
	}

	await app.listen(3000, '0.0.0.0');

	logger.log(
		`Application version ${packageJson.version} is running on: ${await app.getUrl()}`,
	);
	logger.debug(`Environment: ${configService.get('NODE_ENV')}`);
}

bootstrap();
