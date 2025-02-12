/* eslint-disable */

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from '../src/app.module';

async function generateSwaggerSpec() {
  const app = await NestFactory.create(AppModule);

  const config = (new DocumentBuilder)
    .setTitle('TAPIE API')
    .setDescription('TAPIE System API')
    .setVersion('1.0')
    .addBearerAuth({
        type:         'http',
        scheme:       'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('../../docs/openapi.json', JSON.stringify(document, null, 2));

  await app.close();
}

generateSwaggerSpec().then(() => {
  console.log('Swagger spec generated');

  process.exit(0);
})
  .catch(error => {
    console.error('Error generating swagger spec', error);

    process.exit(1);
  });
