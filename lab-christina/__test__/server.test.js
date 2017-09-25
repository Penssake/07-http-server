'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');

describe('GET', () => {
  test('should respond with a 404', () => {
    return superagent.post('http://localhost:4000/')
      .set({ 'Content-Type': 'application/json'})
      .send('{')
      .then(Promise.reject)
      .catch(response => {
        expect(response.status).toEqual(404);
        console.log(response);
        expect(response.response.text).toEqual('bad request');
      });
  });
});
