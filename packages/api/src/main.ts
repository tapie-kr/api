import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  const configService = app.get(ConfigService)
  const isProduction = configService.get('NODE_ENV') === 'production'

  app.enableCors({
    origin: isProduction ?
      ['https://tapie.kr/', 'https://api.tapie.kr/', 'https://admin.tapie.kr/', 'https://lms.tapie.kr/'] :
      '*',
  })

  await app.listen(
    isProduction ? Number(configService.get('PORT') || 3000) : 8877,
    '0.0.0.0'
  )
}

bootstrap()
