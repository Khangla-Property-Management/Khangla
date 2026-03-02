import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  it('/api/v1/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect((response) => {
        expect(response.body).toMatchObject({
          status: 'ok',
          app: 'khanla-be',
        });
      });
  });

  it('/api/v1/users/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/users/register')
      .send({
        fullName: 'Khang La',
        email: 'khangla@example.com',
        password: 'password123',
      })
      .expect(201)
      .expect((response) => {
        expect(response.body).toMatchObject({
          fullName: 'Khang La',
          email: 'khangla@example.com',
        });
        expect(response.body.id).toBeDefined();
        expect(response.body.createdAt).toBeDefined();
        expect(response.body.password).toBeUndefined();
      });
  });

  it('/api/v1/users/register (POST) validates payload', () => {
    return request(app.getHttpServer())
      .post('/api/v1/users/register')
      .send({
        fullName: '',
        email: 'invalid-email',
        password: '123',
      })
      .expect(400);
  });
});
