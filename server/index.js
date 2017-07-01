'use strict';

//package imports
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

//constants
const port = process.argv[2] || 8001;
const host = 'localhost';
const clientDir = path.join(__dirname, '../client');

//create server
const server = http.createServer();

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url);
    //TODO: get extension of url being requested
    // if none: try turning to html for fs.exists
    // if one of static file, use static (ico, jpg, etc)
    // if json, use mock api

    //TODO: if first(?) position of url is 'api', we are going to api (set up new module for dealing with that)
    
    let pathName = path.join(clientDir, parsedUrl.pathname);

    if(parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(`${pathName}/index.html`).pipe(res);
    } else {
        fs.exists(pathName, exists => {
            if(exists) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                fs.createReadStream(pathName).pipe(res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>File not found</h1>');
            }
        });
    }

    
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // fs.createReadStream(path.resolve('index.html')).pipe(res);

    //res.end(`You hit the url: ${parsedUrl}`);
});

server.on('error', err => {
    console.log('ERRROR', err);
});

server.listen(port, host, () => {
    console.log('Server up on port', port);
});