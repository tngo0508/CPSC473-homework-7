var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss = require("./websockets-server");
var mime = require("mime");

var handleError = function(err, res) {
  var filePath = extract("/error.html");
  console.log(filePath);
  res.writeHead(404);
  fs.readFile(filePath, function(req, data) {
    res.end(data);
  });
};

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      if (filePath === extract("/test.pdf")) {
        res.setHeader("Content-Type", mime.getType("pdf"));
      } else if (filePath === extract("/test.txt")) {
        res.setHeader("Content-Type", mime.getType("txt"));
      } else if (filePath === extract("/test.mp3")) {
        res.setHeader("Content-Type", mime.getType("mp3"));
      } else if (filePath === extract("/test.mp4")) {
        res.setHeader("Content-Type", mime.getType("mp4"));
      }
      res.end(data);
    }
  });
});
server.listen(3000);
