const db = require('../data/db');

module.exports = {
  getAllResults: () => db('survey'),
  addSurvey: survey => db('survey').insert(survey),
};
