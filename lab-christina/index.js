'use strict';

const dotenv = require('dotenv').config();
const server = require('./lib/server.js');
const PORT = 4000 || process.env.PORT;

server.start(PORT, () => {
  console.log('server ::', PORT);
});
