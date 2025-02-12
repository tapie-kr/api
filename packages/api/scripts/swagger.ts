/* eslint-disable */

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as readline from 'node:readline';
import { AppModule } from '../src/app.module';

async function generateSwaggerSpec() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const app = await NestFactory.create(AppModule);

  const version = await new Promise<string>((resolve) => {
    rl.question('Enter the API version: ', (answer) => {
      resolve(answer);
      rl.close();
    });
  });

  const config = new DocumentBuilder()
    .setTitle('TAPIE API')
    .setDescription('TAPIE System API')
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken',
    )
    .addServer('http://localhost:8877', 'Local Development')
    .addServer('https://tapie-api-development.vport.dev', 'Remote Development')
    .addServer('https://api.tapie.kr', 'Remote Production')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('../../docs/openapi.json', JSON.stringify(document, null, 2));

  await app.close();
}

generateSwaggerSpec()
  .then(() => {
    console.log('Swagger spec generated');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error generating swagger spec', error);
    process.exit(1);
  });
