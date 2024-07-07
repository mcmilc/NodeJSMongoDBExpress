const http = require("http");
const url = require("url");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const productData = JSON.parse(data);
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/api") {
    console.log(productData);
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Invalid page!</h1>");
  }
});

const port = 8000;
server.listen(port, "127.0.0.1", () => {
  console.log(`Listening to requests on port ${port}`);
});
