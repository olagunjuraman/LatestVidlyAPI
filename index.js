const express = require("express");

const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Yeah i am awesome");
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
