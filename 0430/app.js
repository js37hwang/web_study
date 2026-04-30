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
app.get('/ajax', function (req, res) {
    res.sendFile(path.join(__dirname, 'ajaxPrac.html'));
});

app.get('/test', function (req, res) {
    console.log(req.query); 
    res.send('서버 응답!');
});

app.get('/request1', function (req, res) {
    console.log(req.query); 
    res.send('request1 전송!');
});
app.get('/request2', function (req, res) {
    console.log(req.query); 
    res.send('request2 전송!');
});
app.get('/request3', function (req, res) {
    console.log(req.query); 
    res.send('request3 전송!');
});
app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/multiply', function (req, res) {
    res.sendFile(path.join(__dirname, 'multiplyPrac.html'));
});
app.get('/mul3', function (req, res) {
    res.send({res : Number(req.query.num1) *  Number(req.query.num2) *  Number(req.query.num3) });
});

app.get('/checkPrice', function (req, res) {
    res.sendFile(path.join(__dirname, 'priceQuiz.html'));
});
app.get('/returnItem', function (req, res) {
    let itemName = '구매 가능한 상품이 존재하지 않습니다.';
    const itemPrice = [
        {name : 'item1', price : 1000}, 
        {name : 'item2', price : 5000}, 
        {name : 'item3', price : 10000}, 
        {name : 'item4', price : 30000}, 
        {name : 'item5', price : 50000}, 
        {name : 'item6', price : 100000}, 
        {name : 'item7', price : 500000}, 
        {name : 'item8', price : 800000}, 
        {name : 'item9', price : 1000000}, 
        {name : 'item10', price : 3000000}, 
        {name : 'item11', price : 5000000}, 
    ]
    const inputPrice = Number(req.query.price)

    for(let i = 0; i < itemPrice.length-1; i++){

        if(itemPrice[i].price <= inputPrice &&  
            inputPrice < itemPrice[i+1].price){
            itemName = itemPrice[i].name
            break;
        }
    }
    res.send({itemName});
});