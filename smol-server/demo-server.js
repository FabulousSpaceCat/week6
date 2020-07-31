//All the requirements for this server, and a port (I might be 13 on the inside)
const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 6969;


http.createServer((req, res) => {
    // If there is a request, log it.
    console.log(`Request to server for ${req.url}`);
    // Parse the address into an object with the URL module 
    let page = url.parse(req.url, true);
    // Get the path name out of the object
    let file = `.${page.pathname}`;
    // This is probably not the best way to do redirects, this is more like what, an alias?
    if (file == "./") {
        file = "./index.html"; 
    }
    else if (file == "./about") {
        file = "./about.html";
    }
    // This is a solution from stackOverflow for getting the file extension without requiring the Path module
    // It will also handle multi-extensions like tar.gz where Path would not
    // This is probably not actually useful except that now I have one less require line
    let extname = page.pathname.substring(page.pathname.indexOf('.')).toLowerCase();
    // Straight out of the MDN, this is for if there's other files requested and setting their mimetypes
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
    // No but really things that don't match or don't have a file extension are just rendered as text or html
    // I was going to leave it as application but someone could drop a file in my server and execute it that way
    let contentType = mimeTypes[extname] || 'text/html';
    // Now we handle errors, this is mostly from the MDN
    fs.readFile(file, (err, con) => {
        const headers = {
            "Content-Type": contentType,
        }
        if (err) {
            if(err.code == 'ENOENT') {
                // I'm writing my own error handling, mostly from yesterday's lesson
                let statusCode = 404;
                let body = `
                    <p>These are not the droids you're looking for.</p>
                    <p>Check your url and try again, error ${statusCode}.</p>`;
                res.writeHead(statusCode, headers);
                return res.end(body);
            }
            else {
                let statusCode = 500;
                let body = `
                    <p>Look out Ma, she's gonna blow!</p>
                    <p>Check with the site admin about this error ${statusCode}.</p>`;
                res.writeHead(statusCode, headers);
                return res.end(body);
            
            };
        }
        // Sometimes we're all good tho
        else {
            let statusCode = 200;
            res.writeHead(statusCode, headers);
            res.write(con);
            return res.end();
        };
    });
//And then we tack listen straight on instead of making a function after
}).listen(port);
// And we're running at?
console.log(`Server running at localhost:${port}`);


/* This is the original way I did it, and it works
http.createServer((req,res) => {
    // If there is a request, log it.
    console.log(`Request to server for ${req.url}`);
    // If there is a request to nuffin, give the index.html, if to about with no extension, give the about.html file
    filePath = `. ${req.url}`;
    if (filePath == "./") {
        filePath = "./index.html"; 
    }
    else if (filePath == "./about") {
        filePath = "./about.html";
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
    let contentType = mimeTypes[extname] || 'application/octet-stream';
    // Now we handle errors, this is mostly from the MDN
    fs.readFile(filePath, (err, con) => {
        const headers = {
            "Content-Type": contentType,
        }
        if (err) {
            if(err.code == 'ENOENT') {
                // I'm writing my own error handling, mostly from yesterday's lesson
                let statusCode = 404;
                let body = `
                    <p>These are not the droids you're looking for.</p>
                    <p>Check your url and try again, error ${statusCode}.</p>`;
                res.writeHead(statusCode, headers);
                res.end(body);
            
            }
            else {
                let statusCode = 500;
                let body = `
                    <p>Look out Ma, she's gonna blow!</p>
                    <p>Check with the site admin about this error ${statusCode}.</p>`;
                res.writeHead(statusCode, headers);
                res.end(body);
            
            };
        }
        // Sometimes we're all good tho
        else {
            let statusCode = 200;
            res.writeHead(statusCode, headers);
            res.end(con);
        };
    });
//And then we tack listen straight on instead of making a function after
}).listen(port);
// And we're running at?
console.log(`Server running at localhost:${port}`);
*/