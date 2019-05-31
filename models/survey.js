const Joi = require('@hapi/joi');

const db = require('../data/db');
const chrome = require('../utils/invalidUrl');

module.exports = {
  getAllRatings: () => db('survey'),
  getRatingsNoIp: () =>
    db
      .select('id', 'url', 'rating')
      .from('survey')
      .orderBy('rating', 'desc'),

  getAverageRatings: () =>
    db
      .select('url')
      .avg('rating as avgRating')
      .count('url as count')
      .from('survey')
      .groupBy('url')
      .orderBy('avgRating', 'desc'),

  addSurvey: survey => db('survey').insert(survey),
  schema: survey => {
    const schema = Joi.object().keys({
      url: Joi.string()
        .uri()
        .invalid(chrome)
        .required(),
      rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),
      ip: Joi.string().ip()
    });

    return Joi.validate(survey, schema);
  }
};
