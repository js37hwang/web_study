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

// naver api
const apiurl =
  "https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930&_callback=window.__jindo2_callback._3694";

async function resParse(res) {
  // 이부분이 상당히 낯설고 어렵군요
  const text = await res.text();
  const jsonStr = text.match(/\((.*)\)/s)[1];
  return JSON.parse(jsonStr);
}

app.get("/naverChart", function (req, res) {
  res.sendFile(path.join(__dirname, "naverChart.html"));
});

app.get("/getNaverStockChart", async function (req, res) {
  try {
    const result = await fetch(apiurl);

    const data = await resParse(result);

    if (data.resultCode === "success") {
      res.send(data.result);
    }
    console.log(data.result);
  } catch (err) {
    console.error(err);
  }
});

app.get("/naverStockChart", function (req, res) {
  res.sendFile(path.join(__dirname, "naverStockChart.html"));
});

function getNowDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 서버 기동 시 1초마다 네이버 api 호출하여 데이터 db 저장
let stocksCollectInterval = setInterval(stocksCollect, 1000);

async function stocksCollect() {
  try {
    const result = await fetch(apiurl); // api 호출
    const data = await resParse(result); // JSONP -> JSON

    if (data.resultCode === "success") {
      const { nv, cd, nxtOverMarketPriceInfo } =
        data?.result?.areas[0]?.datas[0];

      const currentTime = getNowDate();

      const sql = `insert into stock_naver (nv, cd, trade_time, api_called_at ) values (?, ?, ?, ?);`;

      connection.query(
        sql,
        [nv, cd, nxtOverMarketPriceInfo?.localTradedAt, currentTime],
        function (error) {
          if (error) throw error;
        },
      );
    }
  } catch (error) {
    console.error(error);
  }
}

// db에 저장된 데이터 가져오기
app.post("/getChartDatas", function (req, res) {
  const sql = `select cd, nv, api_called_at from stock_naver order by id desc limit 10;`;

  connection.query(sql, function (error, rows) {
    if (error) throw error;

    res.send(rows);
  });
});
