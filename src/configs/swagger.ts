import { APIResponseDto } from '@/common/dto/response.dto';
import { type INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default async function initSwagger(app: INestApplication) {
	const configService = app.get(ConfigService);
	const logger = new Logger('SwaggerConfig');
	const isProduction = configService.get('NODE_ENV') === 'production';

	if (isProduction) {
		logger.warn('Swagger is disabled in production environment');
		return;
	}

	const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
	const { SwaggerTheme, SwaggerThemeNameEnum } = await import('swagger-themes');

	const theme = new SwaggerTheme();
	const config = new DocumentBuilder()
		.setTitle('TAPIE API')
		.setDescription('TAPIE Ecosystem API')
		.addCookieAuth(
			'accessToken',
			{
				type: 'apiKey',
				in: 'cookie',
			},
			'accessToken',
		)
		.addCookieAuth(
			'refreshToken',
			{
				type: 'apiKey',
				in: 'cookie',
			},
			'refreshToken',
		)
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		extraModels: [APIResponseDto],
	});

	SwaggerModule.setup('docs', app, document, {
		jsonDocumentUrl: 'docs/json',
		explorer: true,
		yamlDocumentUrl: 'docs/yaml',
		customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
		customfavIcon: 'https://s3.tapie.kr/tapie-static/favicon.ico',
		customSiteTitle: 'TAPIE API Swagger',
	});

	logger.log('Swagger initialized successfully');
}
