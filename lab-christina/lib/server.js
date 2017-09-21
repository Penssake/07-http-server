//node dependencies
const http = require('http');
const requestParser = require('./request-parser.js');
//npm dependencies
//constants
let cowsay = require('cowsay');
const app = http.createServer((request, response) => {

  requestParser(request)
    .then(request => {
      if(request.method === 'GET' && request.url.pathname === '/'){
        response.writeHead(200, {'Content-Type': 'JSON'});
        response.write(cowsay.think({
          text: 'I\'m a bird',//my cow does not look like a cow.
          e: '@@',
          T: 'U',
          wrap: false,
        }));
        response.end();
        return;
      }

      response.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      response.write(`resource ${request.url.pathname} not found!`);
      response.end();
    })
    .catch(err => {
      console.log(err);

      response.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      response.write('bad request');
      response.end();
    });
});

module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};
