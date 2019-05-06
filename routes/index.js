const rating = require('./rating');
const { logger, errorLogger } = require('../middleware/winston');

module.exports = server => {
  server.use(logger);
  // server.use((req, res) => console.log(req.body));
  server.use('/api/rating', rating);
  server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server up & running!' });
  });

  server.use(errorLogger);
};
