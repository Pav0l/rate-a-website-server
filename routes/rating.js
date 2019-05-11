const router = require('express').Router();
const uuid = require('uuid');
const cors = require('cors');

const validate = require('../middleware/validate');
const urlSplitter = require('../utils/urlSplitter');
const Survey = require('../models/survey');

router.options('*', cors());

router.get('/', async (req, res, next) => {
  try {
    const ratings = await Survey.getRatingsNoIp();
    res.status(200).json(ratings);
  } catch (err) {
    next(err);
  }
});

router.get('/all', async (req, res, next) => {
  try {
    const ratings = await Survey.getAllRatings();
    res.status(200).json(ratings);
  } catch (err) {
    next(err);
  }
});

router.get('/average', async (req, res, next) => {
  try {
    const avgRatings = await Survey.getAverageRatings();
    res.status(200).json(avgRatings);
  } catch (err) {
    next(err);
  }
});

router.post('/', validate(Survey.schema), async (req, res, next) => {
  const { rating, url } = req.body;
  if (rating && url) {
    try {
      const newRating = await Survey.addSurvey({
        url: urlSplitter(url),
        rating: Number(rating),
        id: uuid(),
        ip: req.ip,
      });

      if (newRating) {
        res.status(201).json({ message: 'ok' });
      }
    } catch (err) {
      next(err);
    }
  } else {
    res
      .status(400)
      .json({ message: 'Invalid req.body. Needs rating and tab info' });
  }
});

module.exports = router;
