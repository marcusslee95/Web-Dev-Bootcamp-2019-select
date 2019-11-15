const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static('public'));

// console.log(date);
// console.log(date());

// var item = "";
const items = ["Buy food",
"Cook food",
"Eat food"];
const workItems = [];

app.get("/", function(req, res) {
  // let day = date.getDate();
  const day = date.getDay();


  /*
  var currentDayAsNumber = today.getDay();
  var day = "";

  switch (currentDayAsNumber) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("Error current day is equal to: " + currentDayAsNumber);
  }
*/
/*
  if (today.getDay() == 6 || today.getDay() == 0) {
    // res.write("<h1>Yay it's a weekend</h1>");

  } else {
    // res.write("<p>Booooo! It's not the weekend</p>");
    // res.write("<h1>Nooooo! I have to work</h1>");
    // res.send();
    // res.sendFile(__dirname + "/index.html");

  }
  */

  res.render("list", {listTitle: day, taskToAdd:items});
})

app.post("/", function(req, res){
  // console.log(req.body.newItem);
  // console.log(req.body);
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    // res.render("list", {kindOfDay: day, taskToAdd:req.body.newItem});
    res.redirect("/"); // trigger the get handler at "/"
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work", taskToAdd:workItems});
});

app.post("/work", function(req,res){
  const workItem = req.body.newItem;
  workItems.push(workItem);
  res.redirect("/work");
});

app.get("/about", function(req,res){
  res.render("about");
});

app.listen("3000", function() {
  console.log("Server is now listening for requests");
})
