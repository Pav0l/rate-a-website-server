const db = require('../data/db');

module.exports = {
  getAllRatings: () => db('survey'),
  getRatingsNoIp: () => db.select('id', 'url', 'rating').from('survey'),
  getAverageRatings: () =>
    db
      .select('url as Website')
      .avg('rating as Average Rating')
      .from('survey')
      .groupBy('url'),
  addSurvey: survey => db('survey').insert(survey),
};
