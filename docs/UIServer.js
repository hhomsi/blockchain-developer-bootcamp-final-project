var http = require("http");
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;

    switch (path) {
        case '/':
        case '/index.html':
            fs.readFile("index.html", function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error + path);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;


        default:
            fs.readFile(path.substring(1, path.length), function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error + path);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;

    }
    console.log('\x1b[34m%s\x1b[0m','new reqest ' + path);
    


});
server.listen(3000);  
console.log('\x1b[35m%s\x1b[0m','P2P Insurance Dapp');
console.log('\x1b[33m%s\x1b[0m','listen to ...');
console.log('\x1b[32m%s\x1b[0m','http://localhost:3000/');