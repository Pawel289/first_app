const express = require("express");
const http = require('http');
const fs = require('fs');
const path = require('path');

app = express();

app.use(express.static(path.join(__dirname,'public')));

/*
const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".jpg": "image/jpeg"
};
*/

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.listen(8081,function(){
    console.log('Serwer started on port 8081');
});

/*
const server = http.createServer(function (req,res){
    const filePath = path.join(__dirname, 'public/index.html');
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
}).listen(8081);

*/
