'use strict';

const url = require('url');
const queryString = require('queryString');

module.exports = (request) => {
  return new Promise((resolve, reject) => {
    request.url = url.parse(request.url);
    request.url.query = queryString.parse(request.url.query);

    if(!(request.method === 'POST' || request.method === 'PUT'))
      return resolve(request);

    let text = '';
    // only parse the POST || PUT request bodies
    request.on('data', (buffer) => {
      text += buffer.toString();
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(text);
        resolve(request);
      } catch (err) {
        reject(err);
      }
    });
  });
};
