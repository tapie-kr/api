import Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

if (process.env.NODE_ENV !== 'production') {
  Sentry.init({
    dsn:          process.env.SENTRY_DSN,
    integrations: [nodeProfilingIntegration()],
  });
}
