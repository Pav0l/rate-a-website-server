const db = require('../data/db');

module.exports = {
  getAllRatings: () => db('survey'),
  getRatingsNoIp: () => db.select('id', 'url', 'rating').from('survey'),
  getAverageRatings: () =>
    db
      .select('url as website')
      .avg('rating as average rating')
      .from('survey')
      .groupBy('url'),
  addSurvey: survey => db('survey').insert(survey),
};
