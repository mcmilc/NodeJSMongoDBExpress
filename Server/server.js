// SECTION 2 - Part 11
const http = require("http");
/*
- create server and provide callback function that is executed per request (req)
- executing "curl -X GET http://localhost:8000" will fire an event that will result in the 
  server responding "Hello ..."
- the callback funciton gets executed each time there is a new request (req)
*/

const server = http.createServer((req, res) => {
  //console.log(req);
  res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
