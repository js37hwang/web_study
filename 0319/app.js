// 서버를 띄우기 위한 기초 세팅
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80); // 기본 port: http -> 80/ https -> 443

// HTML파일 출력을 위해
const path= require('path');

app.get('/', function (req, res) {
    res.send('hello world ㅎㅎ!');
});

app.get('/main', function(req, res){
    res.sendFile(path.join(__dirname, 'main.html'));
})

app.get('/test2', function(req, res){
    res.sendFile(path.join(__dirname, 'test2.html'));
})

app.get('/test3', function(req, res){
    res.sendFile(path.join(__dirname, 'test3.html'))
})

console.log('hello back!')


app.get('/test', function(req, res){
    res.send(
        `<html>
            <head>
                <title>Document</title>
            </head>
            <body>
                <p>HELLO HTML</p>
                <input type="text">
                <input type="button" value="search">
            </body>
        </html>`
    )
})
