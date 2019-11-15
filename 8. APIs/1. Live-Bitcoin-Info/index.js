//jshint esversion:6

//Part1: Setting up = Bring in modules you're going to use + create instance of a server + tell server to use body parser to parse requests
const express = require("express");  // used to create servers
const bodyParser = require("body-parser"); // used to parse what was sent in requests
const request = require("request"); // used to make http requests to other servers aka. using the apis (read apis as "ways providers give to interact with their thing")

const app = express();
app.use(bodyParser.urlencoded({extended: true})); //knows here that it'll use body parser. So when have routes in callback function req.body will refer to parsed body

//Part 2: Setting up routes aka. what will server's response be when people send requests to places you've set up responses for
app.get("/", function(req,res){
  // console.log(req.body);
  res.sendFile(__dirname + "/index.html");
}
);



app.post("/", function(req,res){
  // console.log(req.body.crypto);

  //Practicing a get request to an external server with parameters
  var optionObject = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from:req.body.crypto,
      to: req.body.currency,
      amount: req.body.quantity
    }
  };
  request(optionObject, function(error, response, body){
    var data = JSON.parse(body);
    var time = data.time;
    var price = data.price;
    res.write("<p> The time is " + time + ".</p>");
    res.write("<h1>The price of " + req.body.quantity + " " + req.body.crypto + " is " + price + " " + req.body.currency + ".</h1>");
    res.send();
  });
  /* Practicing a get request to an external server without parameters
  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + req.body.crypto + req.body.currency, function(error, response, body){
    // console.log(response);
    // console.log(response.statusCode);
    // console.log(body);
    var data = JSON.parse(body); // turning the response aka. a json object aka. a js object with quotations around it aka. one big string..... and just taking out the quotation marks pretty much (along with adding back the lines that were taken out to make it as small as possible cuz want json object to travel fast to people that requested it)
    // console.log(data);
    var price = data.last;
    // var lastPrice = data.changes.price.week;
    console.log(price);
    res.write("<p> The date is " + data.display_timestamp + ".</p>");
    res.write("<h1>The price of " + req.body.crypto + " is " + price + " " + req.body.currency + ".</h1>");
    res.send();
    // res.send("<h1>The price of " + req.body.crypto + " is " + price + " " + req.body.currency + ".</h1>");
  });
  */
});


//Part 3: Having server starting to listen on a certain channel (in this case a port on my computer)
  // note: sets up route first cuz imagine if someone sends a request to the route before computer reads the listen line...
app.listen("3000", function(){
  console.log("I'm ready to listen to your requests now!");
});
