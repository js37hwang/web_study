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
        { name: 'item1',  productName: '볼펜', price: 1000 },
        { name: 'item2',  productName: '무선 이어폰 케이스', price: 5000 },
        { name: 'item3',  productName: '보조배터리', price: 10000 },
        { name: 'item4',  productName: '기계식 키보드', price: 30000 },
        { name: 'item5',  productName: '27인치 모니터', price: 50000 },
        { name: 'item6',  productName: '중저가 스마트폰', price: 100000 },
        { name: 'item7',  productName: '노트북', price: 500000 },
        { name: 'item8',  productName: '고급형 노트북', price: 800000 },
        { name: 'item9',  productName: '플래그십 스마트폰', price: 1000000 },
        { name: 'item10', productName: '중고 경차', price: 3000000 },
        { name: 'item11', productName: '중고 준중형차', price: 5000000 }
    ]
    const inputPrice = Number(req.query.price)

    itemPrice.sort((a, b) => a.price - b.price); // 오름차순 정렬

    for(let i = 0; i < itemPrice.length-1; i++){ 
        // -> 근데 이건 리스트가 오름차순 정렬이라는 가정일때임..!! 즉, 먼저 정렬해주는 로직이 들어가야 함

        if(itemPrice[i].price <= inputPrice &&  
            inputPrice < itemPrice[i+1].price){
            itemName = `${itemPrice[i].productName} (${itemPrice[i].name})`
            break;
        }
    }
    res.send({itemName});
});
