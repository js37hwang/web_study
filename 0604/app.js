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
  const sql = `select * from news where deleted_at IS null;`;

  connection.query(sql, function (error, rows) {
    if (error) throw error;

    console.log(rows);
    res.send(rows);
  });
});

app.get("/newsDetailPage", function (req, res) {
  res.sendFile(path.join(__dirname, "newDetailPage.html"));
});

app.get("/getSingleNewsById", function (req, res) {
  const sql = `select * from news where id = ${req.query.id}  and deleted_at IS null;`;

  connection.query(sql, function (error, rows) {
    if (error) throw error;

    console.log(rows);
    res.send(rows);
  });
});

app.get("/newsEditPage", function (req, res) {
  res.sendFile(path.join(__dirname, "newsEditPage.html"));
});

app.post("/editNews", function (req, res) {
  const sql = `update news set title = '${req.body.title}', content = '${req.body.content}' where id = ${req.body.id} and deleted_at IS null;`;

  connection.query(sql, function (error, rows) {
    if (rows.affectedRows == 1) {
      res.send("success");
    } else {
      res.send("fail");
    }
    if (error) throw error;
  });
});

function addCol() {
  const sql = `ALTER TABLE news ADD COLUMN deleted_at DATETIME NULL`;

  connection.query(sql, function (error, rows) {
    if (error) throw error;
  });
}

app.post("/delNews", function (req, res) {
  const sql = `update news set deleted_at = NOW() where id = ${req.body.id};`;

  connection.query(sql, function (error, rows) {
    if (rows.affectedRows == 1) {
      res.send("success");
    } else {
      res.send("fail");
    }
    if (error) throw error;
  });
});

app.get("/timerPage", function (req, res) {
  res.sendFile(path.join(__dirname, "time.html"));
});

app.get("/chartPage", function (req, res) {
  res.sendFile(path.join(__dirname, "chart.html"));
});
