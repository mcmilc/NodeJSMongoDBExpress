const url = require("url");
const http = require("http");
const fs = require("fs");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

const productData = fs.readFileSync(
  `${__dirname}/data/product-data.json`,
  "utf-8"
);

const templateFields = JSON.parse(
  fs.readFileSync(`${__dirname}/config/template-fields.json`, "utf-8")
);
//console.log(templateFields["templateFields"]);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const productDataJSON = JSON.parse(productData);

const server = http.createServer((req, res) => {
  //console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  console.log(`Query: ${query["id"]}, pathname: ${pathname}`);
  const pathName = req.url;

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    // leaving out the curly braces after the => expression will return output value
    // of replaceTemplate
    const cardsHtml = productDataJSON
      .map((el) =>
        replaceTemplate(tempCard, el, templateFields["templateFields"])
      )
      .join("");

    const page = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(page);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = productDataJSON[query.id];
    console.log(product);
    const output = replaceTemplate(
      tempProduct,
      product,
      templateFields["templateFields"]
    );
    res.end(output);
  } else if (pathname === "/api") {
    console.log(productDataJSON);

    res.writeHead(200, { "Content-type": "application/json" });

    res.end(productData);
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
