'use strict';

//package imports
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

//constants
const port = process.argv[2] || 8001;
const host = 'localhost';
const clientDir = path.join(__dirname, '../client/lightr-client/public');

//create server
const server = http.createServer();

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url);
    //const extName = path.extname(req.url);

    if(parsedUrl.pathname.includes('api')) {
        const fullPath = path.join(__dirname, `../${parsedUrl.pathname}.json`);
        //return api data or mock
        fs.exists(fullPath, exists => {
            if(exists) {
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Content-Type': 'application/json' 
                });
                fs.readFile(fullPath, 'utf-8', (err, data) => {
                    if(err) {
                        const response = {
                            "result": false,
                            "msg": "Error Reading Json"
                        };
                        return res.end(response);
                    }
                    res.end(data);
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>API Endpoint Not Found</h1>');
            }
        })
    } else {
        //return us the root route for our react spa
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(`${clientDir}/index.html`).pipe(res);
    }
});

server.on('error', err => {
    console.log('ERRROR', err);
});

server.listen(port, host, () => {
    console.log('Server up on port', port);
});