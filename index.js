const express = require("express");
const http = require('http');
const fs = require('fs');
const path = require('path');

app = express();

app.use(express.static(__dirname+'scripts'));
//app.use(express.static('libs'));
const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".jpg": "image/jpeg"
};

const server = http.createServer(function (req,res){
    const filePath = path.join(__dirname, 'public/index.html');
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
}).listen(8081);

