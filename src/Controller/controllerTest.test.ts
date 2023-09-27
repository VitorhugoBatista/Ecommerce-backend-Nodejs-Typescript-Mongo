import request from 'supertest';
import express, { Express } from 'express';
import router from './routes';
import { getBitcoinPrice } from '../Service/bitcoinPriceService';
import { mocked } from "jest-mock";

jest.mock('../Service/bitcoinPriceService'); 

const app: Express = express();
app.use('/', router);

describe('Bitcoin Controller', () => {
  it('should return 400 if no currency is provided', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', "O parâmetro 'currency' é obrigatório.");
  });

  it('should return bitcoin price if a valid currency is provided', async () => {
    mocked(getBitcoinPrice).mockResolvedValueOnce('60000.00');

    const res = await request(app).get('/?currency=USD');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('currency', 'USD');
    expect(res.body).toHaveProperty('price', '60000.00');
  });

  it('should return 500 if an invalid currency is provided', async () => {
    mocked(getBitcoinPrice).mockRejectedValueOnce(new Error('Invalid Currency'));

    const res = await request(app).get('/?currency=INVALID');
    console.log(res.status)
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('message', 'Currency inválido');
  });
});
