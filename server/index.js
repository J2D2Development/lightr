'use strict';

//package imports
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

//local imports
const mimeTypes = require('./utilities/mimetypes');

//constants
const port = process.argv[2] || 8001;
const host = 'localhost';
const clientDir = path.join(__dirname, '../client');

//create server
const server = http.createServer();

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url);
    const extName = path.extname(req.url);
    let pathName = path.join(clientDir, parsedUrl.pathname);

    if(parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(`${pathName}/index.html`).pipe(res);
    } else {
        if(!extName) { 
            //if no extension, try html
            //may need to update this to omit 'api' routes- they won't have an extension and will be .json
            pathName += '.html'; 
        }

        fs.exists(pathName, exists => {
            if(exists) {
                const ext = path.parse(pathName).ext;
                res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
                fs.createReadStream(pathName).pipe(res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>File not found</h1>');
            }
        });
    }
});

server.on('error', err => {
    console.log('ERRROR', err);
});

server.listen(port, host, () => {
    console.log('Server up on port', port);
});