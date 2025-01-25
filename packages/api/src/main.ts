import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  app.enableCors({
    origin: isProduction
      ? [
          'https://tapie.kr/',
          'https://api.tapie.kr/',
          'https://admin.tapie.kr/',
          'https://lms.tapie.kr/',
        ]
      : '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Vedge API')
    .setDescription('암표 방지 티켓 예매 서비스 Vedge API 문서')
    .setVersion('1.0')
    .addTag('vedge')
    .addCookieAuth('sessionId')
    .build();

  await app.listen(isProduction ? Number(configService.get('PORT') || 3000) : 8877, '0.0.0.0');

  logger.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();
