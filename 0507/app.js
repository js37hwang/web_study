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
app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});


app.get('/carPrac', function (req, res) {
    res.sendFile(path.join(__dirname, 'carQuiz.html'));
});
app.get('/carPrice', function (req, res) {

    const carList = [
        {name : '현대', price : 2100}, 
        {name : '기아', price : 1300}, 
        {name : '쌍용', price : 1500}, 
        {name : '벤츠', price : 3500}, 
        {name : 'bmw', price : 3200}, 
    ]
    const colorList = [
        {name : '빨강', price : 100}, 
        {name : '파랑', price : 120}, 
        {name : '초록', price : 200}, 
        {name : '노랑', price : 130}, 
        {name : '검정', price : 80}, 
    ]
    const selectedCar = req.query.car
    const selectedColor = req.query.color

    let totalPrice = 0

    for(let i = 0; i < carList.length; i++){
        if(carList[i].name === selectedCar){
            totalPrice+= Number(carList[i].price);
            break;
        }
    }
    for(let i = 0; i < colorList.length; i++){
        if(colorList[i].name === selectedColor){
            totalPrice+= Number(colorList[i].price);
            break;
        }
    }

    res.send({totalPrice});
});


app.get('/funcPrac', function (req, res) {
    res.sendFile(path.join(__dirname, 'functionPrac.html'));
});
app.get('/funcPrac2', function (req, res) {
    res.sendFile(path.join(__dirname, 'functionPrac2.html'));
});