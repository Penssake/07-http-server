const HTTP = require('http');
const REQUESTPARSER = require('./request-parser.js');

const APP = HTTP.createServer((request, response) => {
  console.log('request.method', request.method);
  console.log('request.headers', request.headers);

REQUESTPARSER(request)
.then(request => {
  if(request.method === 'GET' && request.url.pathname === '/'){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`<!DOCTYPE html>
      <html>
        <head> <title>Hello Universe</title> </head>
        <body> <h1>Goodnight Moon</h1> </body>
      </html>`);
      response.end();
      return;
  }

  if(request.method === 'POST' && request.url.pathname === '/echo'){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(request.body));
    response.end();
    return;
  };

  response.writeHead(404, {
    'Content-Type': 'text/plain';
  });
  response.write(`resource ${req.url.pathname} not found!`)
  res.end();
});
.catch(err => {
  console.log(err);
  response.writeHead(400, {'Content-Type': 'text/plain'});
  response.write('bad request');
  response.end();
});
//register routes//add in
});

module.exports = {
  start: (PORT, callback) => APP.listen(PORT, callback),
  stop: (callback) => APP.close(callback),
};
