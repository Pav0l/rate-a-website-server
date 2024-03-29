const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const whitelist = [
  'moz-extension://8c764801-4e5d-403e-a0d8-69c226c13712',
  'moz-extension://16d56f72-e2c9-41c4-954c-cc00b0ad4302',
  'chrome-extension://akdeaedbblfhendjfkgmkkbmbfjfobpk',
  'chrome-extension://oplipkhodadjellpakfommojjmcikidf',
  'https://happiest-websites.netlify.com'
];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'OPTIONS', 'GET'],
  allowedHeaders: [
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Allow-Headers'
  ]
};

// line up third party middleware
module.exports = server => {
  server.use(helmet());
  server.use(compression());
  server.use(cors(corsOptions));
  server.use(express.json());
};
