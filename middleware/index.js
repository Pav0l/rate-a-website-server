const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
  'Access-Control-Allow-Origin': '*',
};

// line up third pary middleware
module.exports = server => {
  server.use(helmet());
  server.use(compression());
  server.use(cors(corsOptions));
  server.use(express.json());
};
