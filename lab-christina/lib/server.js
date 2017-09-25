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
          text: 'I\'m a bird',
          e: '@@',
          T: 'U',
          wrap: false,
        }));
        response.end();
        return;
      }

      if(request.url.pathname !== '/'){
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write(`resource ${request.url.pathname} not found!`);
      }

      if(request.url.pathname !== '/'){
        response.writeHead(400, {'Content-Type': 'text/plain'});
        response.write('bad request');
        response.end();
      }
    });

  module.exports = {
    start: (PORT, callback) => app.listen(PORT, callback),
    stop: (callback) => app.close(callback),
  };

});
