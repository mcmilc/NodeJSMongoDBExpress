const fs = require("fs");
const hello = "Hello World";
console.log(hello);

// Blocking, synchronous
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `Here we have some more funny stuff: ${hello} ;-)`;
fs.writeFileSync("./txt/output.txt", textOut);

// Non-Blocking, asynchronous
fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("Non-Blocking read done!");

fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(`Error1: ${err}`);
  }
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error2: ${err}`);
    }
    console.log(data);
  });
});
