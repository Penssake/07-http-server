'use strict';

const dotenv = require('dotenv').config();
const server = require('./lib/server.js');
const PORT = process.env.PORT;

server.start(process.env.PORT, () => {
  console.log('server ::', process.env.PORT);
});
