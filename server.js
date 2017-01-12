/**
 * Created by Valerio Bartolini
 */

/**************************************************************************************************
 *                                            NodeJS server                                       *
 *                                           serves app.html                                      *
 *                                        servers static files                                    *
 **************************************************************************************************/

var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path'),
    dir = path.dirname(fs.realpathSync(__filename));

var port = 3000,
    uri = '127.0.0.1';

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var filename = dir + pathname,
        msgOk = 200,
        msgNotFound = 404;

    if (pathname == '/') {
        res.writeHead(msgOk, {'Content-Type': 'text/html'});
        fs.createReadStream(dir + '/app.html').pipe(res);
        return;
    }
    else if (pathname.match(/^\/dist\/js\//)) {
        var stats = fs.existsSync(filename) && fs.statSync(filename);

        if (stats && stats.isFile()) {
            res.writeHead(msgOk, {'Content-Type': 'application/javascript'});
            fs.createReadStream(filename).pipe(res);
            return;
        }
    }
    else if (pathname.match(/^\/js\//)) {
        var stats = fs.existsSync(filename) && fs.statSync(filename);

        if (stats && stats.isFile()) {
            res.writeHead(msgOk, {'Content-Type': 'application/javascript'});
            fs.createReadStream(filename).pipe(res);
            return;
        }
    }
    else if (pathname.match(/^\/dist\/css\//)) {
        var stats = fs.existsSync(filename) && fs.statSync(filename);

        if (stats && stats.isFile()) {
            res.writeHead(msgOk, {'Content-Type': 'text/css'});
            fs.createReadStream(filename).pipe(res);
            return;
        }
    }
    else if (pathname.match(/^\/css\//) || (pathname.match(/^\/bower_components\//))) {
        var stats = fs.existsSync(filename) && fs.statSync(filename);

        if (stats && stats.isFile()) {
            res.writeHead(msgOk, {'Content-Type': 'text/css'});
            fs.createReadStream(filename).pipe(res);
            return;
        }
    }
    else if (pathname.match(/^\/img\//)) {
        var stats = fs.existsSync(filename) && fs.statSync(filename);

        if (stats && stats.isFile()) {
            res.writeHead(msgOk, {'Content-Type': 'image/png'});
            fs.createReadStream(filename).pipe(res);
            return;
        }
    }
    res.writeHead(msgNotFound, {'Content-Type': 'text/plain'});

    res.write('Not Found\n');
    res.end();

}).listen(port, uri);

console.log('Server running on port 3000');