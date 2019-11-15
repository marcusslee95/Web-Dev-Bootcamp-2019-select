//jshint esversion:6
const express = require("express");
const app = express();

app.get("/", function(request, response){
  // console.log(request);
  // response.send("Hello");
  response.send("<h1>Hello World</h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact me @: whoknowswhere.com");
});

app.get("/about", function(req,res){
  res.send("<h1>I'm Marcus</h1><br><p>My best friend is dchoi");
});

app.get("/hobbies", function(req,res){
  res.send("<ul><li>ball</li><li>Code</li><li>Socializing</li><li>Writing</li>");
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
