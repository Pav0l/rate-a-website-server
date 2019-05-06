const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

// line up third pary middleware
module.exports = server => {
  server.use(helmet());
  server.use(compression());
  server.use(cors());
  server.use(express.json());
};
