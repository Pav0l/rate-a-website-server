const faker = require('faker');
const uuid = require('uuid');

const seedData = [];
for (let i = 0; i < 50; i++) {
  const survey = {
    id: uuid(),
    url: faker.internet.url(),
    rating: Math.ceil(Math.random() * 5),
    ip: faker.internet.ip(),
  };
  seedData.push(survey);
}

exports.seed = knex => knex('survey').insert(seedData);
