import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const corsOrigin = configService.get<string>('app.corsOrigin') ?? '*';
  const normalizedCorsOrigin =
    corsOrigin === '*'
      ? '*'
      : corsOrigin.split(',').map((origin) => origin.trim());

  app.enableCors({
    origin: normalizedCorsOrigin,
    credentials: true,
  });

  const port = configService.get<number>('app.port') ?? 3000;
  await app.listen(port);
}
bootstrap();
