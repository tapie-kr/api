import { PrismaInstrumentation } from '@prisma/instrumentation';
import * as Sentry from '@sentry/nestjs';
import * as dotenv from 'dotenv';

const envFiles = ['.env', '.env.production', '.env.development', '.env.local'];
for (const file of envFiles) {
	dotenv.config({ path: file, override: true });
}

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	tracesSampleRate: 1.0,
	environment: process.env.NODE_ENV,
	attachStacktrace: true,
	integrations: [
		Sentry.prismaIntegration({
			prismaInstrumentation: new PrismaInstrumentation(),
		}),
	],
});
