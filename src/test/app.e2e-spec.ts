import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, Body } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { useContainer } from 'class-validator';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => ({
            type: 'sqlite',
            database: ':memory:',
            entities: [],
            synchronize: true,
          }),
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) - return of hateoas links', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        // Check if the response is object
        expect(res.body).toEqual(
          expect.objectContaining({
            start: expect.any(String),
            links: expect.arrayContaining([
              expect.objectContaining({
                type: expect.any(String),
                rel: expect.any(String),
                uri: expect.any(String),
              }),
            ]),
          }),
        );
      });
  });
});
