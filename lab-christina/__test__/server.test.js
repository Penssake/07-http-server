'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');

describe('POST', () => {
  test('should respond with a 400', () => {
    return superagent.post('http://localhost:4000/')
      .set({ 'Content-Type': 'application/json'})
      .send('{')
      .then(Promise.reject)
      .catch(response => {
        expect(response.status).toEqual(400);
        console.log(response);
        expect(response.response.text).toEqual('bad request');
      });
  });

  test('should respond with a 404 NOT FOUND', () => {
    return superagent.post('http://localhost:4000/rando')
      .catch(response => {
        console.log(response);
        expect(response.status).toEqual(404);
      });
  });
});
