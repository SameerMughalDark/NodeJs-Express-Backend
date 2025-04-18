// without- express
// const http = require("http");
// const PORT = 8000;
// const url = require("url"); //to extract url information like path name query params etc...
// const server = http.createServer((req, res) => {
//   if (req?.url === "/favicon.ico") return; //bcz browser favicon ky liye 1 extra request hit krta hai mei us ko avoid krna chahta hoo
//   const urlINFO = url.parse(req.url, true); //pass 2nd argument true to get url params in object format
//   console.log(urlINFO.query);
//   res.end("Welcome to the server");
// });

// server.listen(PORT, () => {
//   console.log(
//     `Server is Running click here to VISIT the Server-> http://localhost:${PORT}`
//   );
// });

// with express
const PORT = 8000;

const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to home page");
});
app.get("/about", (req, res) => {
  res.send("Welcome to ABOUT page");
});
app.listen(PORT, () => {
  console.log(
    `Server is Running click here to VISIT the Server-> http://localhost:${PORT}`
  );
});
