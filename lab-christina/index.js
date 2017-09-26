'use strict';

const dotenv = require('dotenv').config();
const server = require('./lib/server.js');
const PORT = 3000;

server.start(PORT, () => {
  console.log('server ::', PORT);
});
