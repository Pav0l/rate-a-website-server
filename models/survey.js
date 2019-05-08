const Joi = require('@hapi/joi');

const db = require('../data/db');
const chrome = require('../utils/invalidUrl');

module.exports = {
  getAllRatings: () => db('survey'),
  getRatingsNoIp: () => db.select('id', 'url', 'rating').from('survey'),
  getAverageRatings: () =>
    db
      .select('url')
      .avg('rating as average rating')
      .from('survey')
      .groupBy('url'),
  addSurvey: survey => db('survey').insert(survey),
  schema: survey => {
    const schema = Joi.object().keys({
      url: Joi.string()
        .uri()
        .invalid('chrome://extensions') // does not work!
        .required(),
      rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),
      ip: Joi.string()
        .ip()
        .required(),
    });

    return Joi.validate(survey, schema);
  },
};
