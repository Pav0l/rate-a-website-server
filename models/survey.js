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

  getWeightedAverage: () =>
    db
      .with('x', qb => {
        qb.select('url', 'rating')
          .count('url as num')
          .from('survey')
          .groupBy('url', 'rating');
      })
      .select(
        db.raw(
          'url, x.num as count, SUM(x.rating * x.num * 1.0)/SUM(x.num*1.0) as wtAvg from x'
        )
      )
      .groupBy('url')
      .orderBy([
        { column: 'wtAvg', order: 'desc' },
        { column: 'count', order: 'desc' }
      ]),

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
