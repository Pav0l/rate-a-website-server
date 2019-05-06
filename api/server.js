const express = require('express');
require('dotenv').config();

const server = express();

require('../middleware')(server);

require('../routes')(server);

module.exports = server;
