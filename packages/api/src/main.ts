import { AppModule } from '@api/app.module';
import { GlobalExceptionFilter } from '@api/common/filters/global-exception.filter';
import { TransformInterceptor } from '@api/common/interceptors/transform.interceptor';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('bootstrap');
  const isProduction = configService.get('NODE_ENV') === 'production';

  app.useGlobalFilters(new GlobalExceptionFilter);

  app.useGlobalInterceptors(new TransformInterceptor);

  app.useGlobalPipes(new ValidationPipe({
    transform:            true,
    whitelist:            true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors({ origin: isProduction
    ? [
      'https://tapie.kr/',
      'https://api.tapie.kr/',
      'https://admin.tapie.kr/',
      'https://lms.tapie.kr/',
    ]
    : '*' });

  app.enableVersioning({
    type:           VersioningType.URI,
    defaultVersion: '1',
  });

  app.getHttpAdapter().get('/', (_req, res) => {
    res.json({
      status: 'ok', availableVersions: ['v1'],
    });
  });

  await app.listen(isProduction ? Number(configService.get('PORT') || 3000) : 8877, '0.0.0.0');

  logger.log(`Server running on ${await app.getUrl()}`);
}

bootstrap().then();
