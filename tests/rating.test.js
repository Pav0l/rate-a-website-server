const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db');
const faker = require('faker');
const uuid = require('uuid');

describe('Rating resource', () => {
  beforeAll(() => {
    const seedData = [];
    for (let i = 0; i < 5; i++) {
      const survey = {
        id: uuid(),
        url: faker.internet.url(),
        rating: Math.ceil(Math.random() * 5),
      };
      seedData.push(survey);
      return db('survey').insert(seedData);
    }
  });

  afterAll(() => {
    return db('survey').delete();
  });

  it('is in the right NODE_ENV during test', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('GET /api/rating endpoint', () => {
    it('on GET request, should return 5 ratings', async () => {
      const res = await request(server).get('/api/rating');
      expect(res.body).toHaveLength(5);
    });

    it('on GET request, should return an array', async () => {
      const res = await request(server).get('/api/rating');
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
});
