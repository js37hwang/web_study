// 서버를 띄우기 위한 기초 세팅
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80); // 기본 port: http -> 80/ https -> 443

// HTML파일 출력을 위해
const path= require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/369', function (req, res) {
    res.sendFile(path.join(__dirname, 'samYookGu.html'));
});
app.get('/369-2', function (req, res) {
    res.sendFile(path.join(__dirname, 'samYookGu2.html'));
});
app.get('/array-2d-q', function (req, res) {
    res.sendFile(path.join(__dirname, 'Array2DQuiz.html'));
});