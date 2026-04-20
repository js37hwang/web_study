// 서버를 띄우기 위한 기초 세팅
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80); // 기본 port: http -> 80/ https -> 443

// HTML파일 출력을 위해
const path= require('path');

app.get('/', function (req, res) {
    res.send('hello world ㅎㅎ!');
});

app.get('/responsetest', function (req, res) {
    res.send('test222');
});



app.get('/request1', function(req, res){
    res.send('response1');
})
app.get('/request2', function(req, res){
    res.send('response2');
})
// app.get('/request3', function(req, res){
//     res.send('으아아아아 으아아악 아아앙아ㅏ');
// })
app.get('/request3', function(req, res){
    res.send('response3');
})
app.get('/search', function(req, res){
    res.sendFile(path.join(__dirname, 'main.html'));
})


// 0312
app.get('/practice', function(req, res){
    res.sendFile(path.join(__dirname, 'practice.html'));
})

app.get('/test1', function(req, res){
    res.sendFile(path.join(__dirname, 'test1.html'));
})

app.get('/signin', function(req, res){
    res.sendFile(path.join(__dirname, 'signInPage.html'));
})
app.get('/table', function(req, res){
    res.sendFile(path.join(__dirname, 'table.html'));
})
app.get('/resume', function(req, res){
    res.sendFile(path.join(__dirname, 'resume.html'));
})
