//jshint esversion:6

//****Making modules' exports accessible to this file (exports == whatever modules choose to make available to files that require them)
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

/* // The other way to do it
let title = "";
let optionsObject = {};
*/

const posts = [];

//****Creating an instance of the server aka the app (cuz server serves up all the requested files necessary to show the files people ask for and app is - imo - just a way to describe an experience of one digital entity and the def. of server is fulfilling the def of app. So they are the same thing to me. I guess more accurate description would be.... server is providing all the things necessary for the app experience)
const app = express();

//****Setting ejs as the view engine aka. ejs is the lens through which this file will see things. aka. without doing this and seeing the world normally well when this file looks at all those ejs files with all those variable elements it won't be able to make sense of them (i.e. what is the <%= sign) aka it doesn't have capacity to understand ejs in html. It can only understand html. So this line of code let's you understand html with ejs and also knows it should like for web pages in the views folder aka. the location where ejs goes to to find the web pages to serve up.
app.set('view engine', 'ejs');

//****Saying "we willl use body-parser module in order to parse through body of requests people send to our server in order to look at their requests in an organized way and then select specific things in their request i.e. req.body.somethingTheySent"
app.use(bodyParser.urlencoded({extended: true}));
//****Saying "ok so problem with express servers is that they assume everything is online aka. external (i.e. it's why before we had a file that got it's bootstrap css applied because it came from online cdn but not it's local custom css applied even though specified path was correct) and not internal (aka. on the server). Therefore solution is to tell express server aka. app hey so we actually do have some things available to us internally and they are in this 'public' file (my guess is that the app.set('view engine', 'ejs'); code already does this aka. telling express server there are these ejs files available internally to you server. Which makes sense since well the ejs files are not static files aka. they change depending on value you put in for their variables )
app.use(express.static("public"));


//****Setting Up Routes that server will respond to when requests are sent to those Routes
app.get("/", function(req,res){

  /* //the other way to do it
  title = "Home";
  optionsObject = {
    randoTexto: homeStartingContent,
    pageTitle: title
  };
  res.render("home", optionsObject); //****for normal html files we normally used res.sendFile() method but since it's ejs file we've been using .render()
  */
  res.render("home", {randoTexto: homeStartingContent, additionalContent: posts});
  //  console.log(posts);

});

app.get("/about", function(req,res){
  /* //The other way to do this
  title = "About";
  optionsObject = {
    randoTexto: aboutContent,
    pageTitle: title
  }
  res.render("home", optionsObject);
  */
  res.render("about", {randoTexto: aboutContent});
});

app.get("/contact", function(req,res){
  /* //The other way to do this
  title = "Contact";
  optionsObject = {
    randoTexto: contactContent,
    pageTitle: title
  };
  res.render("home", optionsObject);
  */
  res.render("contact", {randoTexto: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose")

});

app.post("/compose", function(req,res){
  const post = {
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/")
});

app.get("/posts/:whatInThePostTitle", function(req, res){
  posts.forEach(function(post){
    /*
    if (req.params.whatInThePostTitle.lowerCase === post.title) {
      console.log("Match Found");
    } else {
      console.log("Not a Match");
      // console.log(req.params.whatInThePostTitle);
    }
    */
    if (lodash.lowerCase(req.params.whatInThePostTitle) === lodash.lowerCase(post.title)) {
      console.log("Match Found");
      res.render("post", {title: post.title, content: post.content}); //req.params.whatInThePostTitl would work too
    } else {
      console.log("Not a Match");
    }
  });
});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
