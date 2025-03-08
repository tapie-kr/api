import Sentry from '@sentry/nestjs';

if (process.env.NODE_ENV !== 'production') {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}
