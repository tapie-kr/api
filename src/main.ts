import './instrument';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new GlobalExceptionFilter());

	await app.listen(3000);

	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
