//jshint esversion:6

const express = require("express"); //it's like saying this file is demanding accesss to express module
const app = express(); //instantiates a server
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true }));


app.get("/", function(req,res){
  // res.send("Hello World");
  res.sendFile(__dirname + "/index.html");
  // console.log(req.body);
}); // if this server receives a get request at said location then it will do this

app.post("/", function(req, res){
  // res.send("Thanks for posting that");
  // console.log(req.body);
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var answer = num1 + num2;
  res.send("The number is " + answer);
});

app.get("/bmicalculator", function(req,res){
  res.sendFile(__dirname + "/bmiCalculator.html");
}); // the way i read this: if the server receives a ___ request at this route then do this

app.post("/bmicalculator", function(req,res){
console.log(req.body);
var weight = req.body.weight;
var height = req.body.height;
var bmi = 703 * weight / (height * height);
res.send("Your BMI is " + bmi);
// 703 x weight (lbs) / [height (in)]2
});

app.listen(3000, function(){
  console.log("server is up and running in port 3000");
}); //server is listening on computer channel 3000
