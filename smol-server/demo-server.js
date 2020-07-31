//All the requirements for this server, and a port (I might be 13 on the inside)
const http = require("http");
const fs = require('fs');
const path = require('path');
const port = 6969;


http.createServer((req,res) => {
    // If there is a request, log it.
    console.log(`Request to server for ${req.url}`);
    // If there is a request to nuffin, give the index.html, if to about with no extension, give the about.html file
    filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html'; 
    }
    else if (filePath == './about') {
        filePath = './about.html';
    }
    // Straight out of the MDN, this is for if there's other files requested and setting their mimetypes
    let extname = String(path.extname(filePath)).toLowerCase();
    let mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };
    // For everything else (there's mastercard)
    contentType = mimeTypes[extname] || 'application/octet-stream';
    // Now we handle errors, this is mostly from the MDN
    fs.readFile(filePath, (err, con) => {
        const headers = {
            "Content-Type": "text/plain",
        }
        if (err) {
            if(err.code == 'ENOENT') {
                // I'm writing my own error handling, mostly from yesterday's lesson
                let statusCode = 404;
                let body = `
                    ${con}, what? \n
                    These are not the droids you're looking for. \n 
                    Check your url and try again, error ${statusCode}.`;
                res.writeHead(statusCode, headers);
                res.end(body, 'utf-8');
            
            }
            else {
                let statusCode = 500;
                let body = `
                    ${con}, what? \n
                    Look out Ma, she's gonna blow! \n 
                    Check with the site admin about this error ${statusCode}.`;
                res.writeHead(statusCode, headers);
                res.end(body, 'utf-8');
            
            };
        }
        // Sometimes we're all good tho
        else {
            let statusCode = 200;
            res.writeHead(statusCode, headers);
            res.end(con, 'utf-8');
        };
    });
//And then we tack listen straight on instead of making a function after
}).listen(port);
// And we're running at?
console.log(`Server running at localhost:${port}`);