'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');

describe('GET', () => {
  test('test should respond with 200');
  return superagent.post('http://localhost:4000')
    .send({
      body: 'Goodnight Moon',
    })
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({body: 'Goodnight Moon'});
    });
});

// test('should respond with a 400', () => {
//   return superagent.post('http://localhost:4000/')
//     .set({ 'Content-Type': 'application/json'})
//     .send('{')
//     .then(Promise.reject)
//     .catch(response => {
//       expect(response.status).toEqual(400);
//       console.log(response);
//       expect(response.response.text).toEqual('bad request');
//     });
// });
