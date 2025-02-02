import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
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
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('TAPIE API')
    .setDescription('TAPIE System API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: 'api-docs/json',
    explorer: true,
    yamlDocumentUrl: 'api-docs/yaml',
  });

  await app.listen(isProduction ? Number(configService.get('PORT') || 3000) : 8877, '0.0.0.0');

  logger.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();
