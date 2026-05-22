// 서버를 띄우기 위한 기초 세팅
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app).listen(80); // 기본 port: http -> 80/ https -> 443

// HTML파일 출력을 위해
const path = require("path");

app.get("/mid1", function (req, res) {
  res.sendFile(path.join(__dirname, "mid1.html"));
});
app.get("/mid2", function (req, res) {
  res.sendFile(path.join(__dirname, "mid2.html"));
});
app.get("/mid3", function (req, res) {
  res.sendFile(path.join(__dirname, "mid3.html"));
});
app.get("/mid4", function (req, res) {
  res.sendFile(path.join(__dirname, "mid4.html"));
});

app.get("/calcbmi", function (req, res) {
  const height = Number(req.query.height) * 0.01;
  const weight = Number(req.query.weight);
  const bmi = weight / (height * height);

  let bmiStr = "";

  // 자스 조건문 작성 시 파이썬처럼 쓰지 않도록 주의..;
  switch (true) {
    case bmi < 20:
      bmiStr = "저체중";
      break;
    case bmi < 25:
      bmiStr = "정상";
      break;
    case bmi < 30:
      bmiStr = "과체중";
      break;
    default:
      bmiStr = "비만";
      break;
  }

  res.send({ bmiStr, bmi: bmi.toFixed(1) });
});

let scoreList = [];

app.get("/returnRank", function (req, res) {
  const kor = Number(req.query.kor);
  const eng = Number(req.query.eng) * 2;
  const math = Number(req.query.math) * 3;
  const total = kor + eng + math;

  scoreList.push(total);
  scoreList.sort((a, b) => b - a);

  const rank = scoreList.indexOf(total) + 1;

  res.send({ rank, numOfPeople: scoreList.length });
});
