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

/**
 * { value: '3',
  tab:
   { active: true,
     audible: false,
     autoDiscardable: true,
     discarded: false,
     favIconUrl: 'https://www.wikipedia.org/static/favicon/wikipedia.ico',
     height: 592,
     highlighted: true,
     id: 2,
     incognito: false,
     index: 0,
     mutedInfo: { muted: false },
     pinned: false,
     selected: true,
     status: 'complete',
     title: 'Wikipedia',
     url: 'https://www.wikipedia.org/',
     width: 1350,
     windowId: 1 } }
 */

router.post('/', async (req, res, next) => {
  const { value, tab } = req.body;
  if (value && tab) {
    try {
      const newRating = await Survey.addSurvey({
        url: urlSplitter(tab.url),
        rating: Number(value),
        id: uuid(),
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
