const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
  // specify requests from which origin are allowed to use resources on server
  // origin: 'chrome-extension://akdeaedbblfhendjfkgmkkbmbfjfobpk',
  // which methods fron origin are allowed
  methods: ['POST', 'OPTIONS', 'GET'],
  allowedHeaders: [
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Allow-Headers',
  ],
};

// line up third party middleware
module.exports = server => {
  server.use(helmet());
  server.use(compression());
  server.use(cors(corsOptions));
  server.use(express.json());
};
