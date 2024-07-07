const http = require("http");
const url = require("url");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/api") {
    fs.readFile(`${__dirname}/data/data.json`, (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
    //res.end("API");
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
