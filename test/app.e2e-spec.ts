import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  const user = {
    id: '4fc315de-2bec-4342-ae88-c6d23d65f43e',
    name: 'JohnDoe',
    email: 'john.doe@example.com',
  };

  it('/users => Email already exists', async () => {
    const requestData = {
      name: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'secureP@ss',
    };
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(requestData);
    expect(response.body).toEqual({
      message: 'Email already exists',
      error: 'Conflict',
      statusCode: 409,
    });
  });

  it('/movies => Unauthorized', async () => {
    const response = await request(app.getHttpServer()).get('/movies');
    expect(response.body).toEqual({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('/movies (GET)', async () => {
    const token = jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    const response = await request(app.getHttpServer())
      .get('/movies')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  let movieId = '';

  it('/movies (POST)', async () => {
    const requestData = {
      title: 'Mock Movie',
      director: 'John Doe',
      year: 2023,
    };
    const token = jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    const response = await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', `Bearer ${token}`)
      .send(requestData);
    movieId = response.body.id;
    expect(response.body).toEqual({
      director: 'John Doe',
      id: movieId,
      title: 'Mock Movie',
      year: 2023,
    });
  });

  it('/movies (GET) with id', async () => {
    const token = jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    const response = await request(app.getHttpServer())
      .get(`/movies/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toEqual({
      id: movieId,
      title: 'Mock Movie',
      director: 'John Doe',
      year: 2023,
    });
  });

  it('/movies (PATCH)', async () => {
    const requestData = {
      title: 'Mock Movie II',
      director: 'John Doe II',
      year: 2024,
    };
    const token = jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    const response = await request(app.getHttpServer())
      .patch(`/movies/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(requestData)
      .expect(200);
    expect(response.body).toEqual({
      id: movieId,
      title: 'Mock Movie II',
      director: 'John Doe II',
      year: 2024,
    });
  });

  it('/movies (DELETE)', async () => {
    const token = jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    const response = await request(app.getHttpServer())
      .delete(`/movies/${movieId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toEqual({});
  });
});
