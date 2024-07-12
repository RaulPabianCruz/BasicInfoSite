import http from 'node:http';
import { URL } from 'node:url';
import fs from 'node:fs';

http.createServer(function(req, res) {
    let newURL = new URL(req.url, 'http://localhost/');
    let path = newURL.pathname;
    let newResponse = getResponse(path);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(newResponse);
    res.end();
}).listen(8080);

function getResponse(pathname){
    try{
        switch(pathname){
            case '/':
                return fs.readFileSync('./index.html', 'utf8');
            case '/about':
                return fs.readFileSync('./about.html', 'utf8');
            case '/contact-me':
                return fs.readFileSync('./contact-me.html', 'utf8');
            default:
                return fs.readFileSync('./404.html', 'utf8');
        }
    } catch(error) {
        console.log(error);
    }
}