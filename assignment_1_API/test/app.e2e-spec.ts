import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let transactionId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('/transactions (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(200);
  });

  it('/transactions (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        description: 'Test transaction POST',
        amount: 100,
        type: 'income',
        date: '2024-06-01',
        category: 'Salary',
      })
      .expect(201);
    expect(response.body).toHaveProperty('_id');
    
    transactionId = response.body._id;
  });

  it('/transactions/:id (UPDATE)', async () => {
    const update = { amount : 100 };
    const response = await request(app.getHttpServer())
      .put(`/transactions/${transactionId}`)
      .send(update)
      .expect(200);
    expect(response.body.amount).toBe(update.amount);
  });

  it('/transactions/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/transactions/${transactionId}`)
      .expect(200);
    expect(response.body).toHaveProperty('_id', transactionId);
  });

  it('/transactions/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/transactions/${transactionId}`)
      .expect(200);
  });


});
