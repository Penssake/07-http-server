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
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(`<!DOCTYPE html>
        <html>
            <head><title></title></head>
          <body>
            <header>
              <nav><ul><li><a href ='https://www.npmjs.com/package/cowsay'>cowsay</a></li></ul></nav>
            </header>
            <main>
              Using cowsay API to creat GET/POST/PUT request through and http server.
              Responses are handled, parsed and tested. All I want to do is style this page.
            </main>
          </body>
        </html>`);
        response.end();
        return;
      }

      if(request.method === 'GET' && request.url.pathname === '/cowsay?text={message}'){
        response.writeHead(200, {'Content-Type': 'JSON'});
        response.write();
        response.write(cowsay.think({
          text: 'I\'m a bird',
          e: '@@',
          T: 'U',
          wrap: false,
        }));
        response.end();
        return;
      }


      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('__ERROR__400__path not found');
      response.end();

    })
    .catch(error => {
      console.log(error);
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.write('__ERR0R__404__bad request');
      response.end();
    });
});

module.exports = {
  start: (PORT, callback) => app.listen(PORT, callback),
  stop: (callback) => app.close(callback),
};
