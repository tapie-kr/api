import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter()
  const app = await NestFactory.create(AppModule, fastifyAdapter)

  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  const configService = app.get(ConfigService)
  const isProduction = configService.get('NODE_ENV') === 'production'

  app.enableCors({
    origin: isProduction ?
      ['https://tapie.kr/', 'https://api.tapie.kr/', 'https://admin.tapie.kr/', 'https://lms.tapie.kr/'] :
      '*',
  })

  const documentConfig = new DocumentBuilder()
    .setTitle('TAPIE API')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, documentConfig)
  SwaggerModule.setup('_docs', app, document)

  await app.listen(
    isProduction ? configService.get('PORT') : 8877,
    '0.0.0.0',
  )
}

bootstrap()
