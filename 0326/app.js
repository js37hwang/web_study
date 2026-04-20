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

app.get('/loop', function(req, res){
    res.sendFile(path.join(__dirname, 'for.html'));
})

app.get('/gugudan', function(req, res){
    res.sendFile(path.join(__dirname, 'gugudan.html'));
})

app.get('/btn100', function(req, res){
    res.sendFile(path.join(__dirname, 'btn100.html'));
})


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
