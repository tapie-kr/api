import packageJson from '@/../package.json';
import { Logger } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import * as Sentry from '@sentry/nestjs';

export default function initSentry(configService: ConfigService) {
	const logger = new Logger('SentryConfig');
	const SENTRY_DSN = configService.get('SENTRY_DSN');
	const NODE_ENV = configService.get('NODE_ENV');

	const client = Sentry.init({
		dsn: SENTRY_DSN,
		environment: NODE_ENV,
		release: packageJson.version,
		tracesSampleRate: 1,
		sampleRate: 1,
		attachStacktrace: true,
		integrations: [
			Sentry.prismaIntegration({
				prismaInstrumentation: new PrismaInstrumentation(),
			}),
			Sentry.redisIntegration(),
		],
	});

	if (client) {
		logger.log('Sentry initialized successfully');
		if (NODE_ENV !== 'production') {
			logger.debug(`Sentry DSN: ${SENTRY_DSN}`);
			logger.debug(`Sentry Environment: ${NODE_ENV}`);
		}
	} else {
		logger.error('Sentry initialization failed');
	}
}
