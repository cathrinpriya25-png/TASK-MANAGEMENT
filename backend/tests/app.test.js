import request from 'supertest';
import app from '../app.js';

describe('API Health Endpoint', () => {
  test('GET /health should return 200 and ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      message: 'Task Management Portal API is running'
    });
  });
});
