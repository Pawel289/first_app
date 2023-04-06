const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
    // Parse the URL
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Serve index.html by default
    let filePath = './public/index.html';

    // Check if a different file was requested
    if (url.pathname !== '/') {
        filePath = `./public${url.pathname}`;
    }

    // Get the file extension
    const extname = path.extname(filePath);

    // Set the Content-Type header based on the file extension
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    // Read the file and serve it
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                // File not found
                res.writeHead(404);
                res.end('404 Not Found');
            }
            else {
                // Server error
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        }
        else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

});

const port = process.env.PORT || 8081;
server.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});

