//node dependencies
const http = require('http');
const requestParser = require('./request-parser.js');
//npm dependencies
//constants
const app = http.createServer((request, response) => {
  // console.log('request.method', request.method); //not necessary but useful
  // console.log('request.headers', request.headers);
  // console.log('request.url', request.url);

  //handeling route below
  requestParser(request)
    .then(request => {
      if(request.method === 'GET' && request.url.pathname === '/'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(`<!DOCTYPE html>
      <html>
        <header> <h1>Hello Universe</h1> </header>
        <body> <h3>Goodnight Moon</h3> </body>
      </html>`);
        response.end();
        return;
      }

      if(request.method === 'POST' && request.url.pathname === '/echo'){
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(request.body));
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
//register routes//add in
});

module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};
