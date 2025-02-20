import { AppModule } from '@/app.module';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { PrismaExceptionFilter } from '@/common/filters/prisma-exception.filter';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('bootstrap');
  const isProduction = configService.get('NODE_ENV') === 'production';

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalFilters(new PrismaExceptionFilter());

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

  const theme = new SwaggerTheme();

  const config = new DocumentBuilder()
    .setTitle('TAPIE API')
    .setDescription('TAPIE System API')
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
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
    customfavIcon: 'https://s3.vport.dev/tapie-static/favicon.ico',
    customSiteTitle: 'TAPIE API Swagger',
  });

  app.getHttpAdapter().get('/', (_req, res) => {
    res.json({
      status: 'ok',
      availableVersions: ['v1'],
    });
  });

  await app.listen(
    isProduction ? Number(configService.get('PORT') || 3000) : 8877,
    '0.0.0.0',
  );

  logger.log(`Server running on ${await app.getUrl()}`);
}

bootstrap().then();
