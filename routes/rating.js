const router = require('express').Router();
const uuid = require('uuid');

const urlSplitter = require('../utils/urlSplitter');
const Survey = require('../models/survey');

router.get('/', async (req, res, next) => {
  try {
    const allRatings = await Survey.getAllResults();
    res.status(200).json(allRatings);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { value, tab } = req.body;
  if (value && tab) {
    try {
      const newRating = await Survey.addSurvey({
        url: urlSplitter(tab.url),
        rating: Number(value),
        id: uuid(),
        ip: req.ip,
      });

      if (newRating) {
        res.status(201).json(newRating);
      }
    } catch (err) {
      next(err);
    }
  } else {
    res
      .status(400)
      .json({ message: 'Invalid req.body. Needs value and tab info' });
  }
});

module.exports = router;
