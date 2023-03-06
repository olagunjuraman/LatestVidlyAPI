const express = require("express");
const dotenv = require("dotenv");

dotenv.config({});

const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send(
    `Yeah i am awesome, ${process.env.DB_NAME} fuck you!, are you sure you want to continue, just ignore this`
  );
});

app.listen(PORT, () => {
  console.log("listening on port");
});

// const http = require("http");

// const server = http.createServer(function (req, res) {
//   if (req.url === "/") {
//     res.write("Hello world crazy motherfuckeffr");
//     res.end();
//   }
// });

// server.listen("4000");

// console.log("listening on port ");
