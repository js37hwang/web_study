// 서버를 띄우기 위한 기초 세팅
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app).listen(80); // 기본 port: http -> 80/ https -> 443

// HTML파일 출력을 위해
const path = require("path");
const mysql = require("mysql2");

// post 방식 사용을 위해
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "web",
});

app.get("/test", function (req, res) {
  let selectQuery = `select * from test`;
  connection.query(selectQuery, function (error, rows, fields) {
    if (error) throw error;

    console.log(rows);

    res.send(rows);
  });
});

app.get("/getbynumber", function (req, res) {
  const num = req.query.id;
  let selectQuery = `select * from test where 1=1 and id = ${num}`;

  connection.query(selectQuery, function (error, rows) {
    if (error) throw error;

    console.log(rows);

    res.send(rows);
  });
});

app.get("/newsWritePage", function (req, res) {
  res.sendFile(path.join(__dirname, "newsWritePage.html"));
});

app.post("/writeNews", function (req, res) {
  const { title, content } = req.body;

  const sql = `insert INTO news (title, content) values ('${title}', '${content}');`;

  connection.query(sql, function (error, rows) {
    if (error) throw error;

    let selectQuery = `SELECT * FROM news ORDER BY id DESC LIMIT 1;`;

    connection.query(selectQuery, function (error, rows) {
      if (error) throw error;

      console.log(rows[0]);
      res.send(rows[0]);
    });
  });
});

app.get("/newsListPage", function (req, res) {
  res.sendFile(path.join(__dirname, "newListPage.html"));
});

app.post("/getTitles", function (req, res) {
  const sql = `select * from news;`;

  connection.query(sql, function (error, rows) {
    if (error) throw error;

    console.log(rows);
    res.send(rows);
  });
});

app.get("/newDetailPage", function (req, res) {
  res.sendFile(path.join(__dirname, "newDetailPage.html"));
});

app.get("/getSingleNewsById", function (req, res) {
  const sql = `select * from news where id = ${req.query.id};`;

  connection.query(sql, function (error, rows) {
    if (error) throw error;

    console.log(rows);
    res.send(rows);
  });
});

app.post("/editNews", function (req, res) {
  const sql = `update news set title = '${req.body.title}', content = '${req.body.content}' where id = ${req.body.id};`;

  connection.query(sql, function (error, rows) {
    if (error) throw error;

    res.send("success");
  });
});
