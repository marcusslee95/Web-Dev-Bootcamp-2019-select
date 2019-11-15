const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

//Setting up a server
const app = new express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //all static files aka. not the dynamic files that ejs templates are i.e. stylesheets .... will be in public folder
app.set('view engine', 'ejs'); //server will use ejs to look at it's web page files which are ejs so duh makes sense to look at ejs stuff through ejs engine


//Setting up connection to db
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true }); //"mongodb://localhost/27017" ==> "protocol://location"
const articleSchema = {
  title: String,
  content: String
};
const Articles = mongoose.model("article", articleSchema); //creating something that will help interact with the articles collection

////////////////////////////////////Requests targeting all articles////////////////////////////////////
// app.route('/book')
//   .get(function (req, res) {
//     res.send('Get a random book')
//   })
//   .post(function (req, res) {
//     res.send('Add a book')
//   })
//   .put(function (req, res) {
//     res.send('Update the book')
//   })
app.route('/articles')
  .get(function(req,res){
    Articles.find({}, function(err,results){
      // console.log(results);
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
      // res.render("home", {articleArray: results});
    });
  })
  .post(function(req,res){
    // console.log(req.body.title);
    // console.log(req.body.content);
    const article = new Articles({
      title: req.body.title,
      content: req.body.content
    }); //creates new entry for the articles collection
    article.save(function(err){
      if(!err){
        res.send("Success adding new article to db");
      } else {
        res.send(err);
      }
    }); //saves this new entry into the actual articles collection in db

    // console.log(req.body.params.content);
  })
  .delete(function(req,res){
    Articles.deleteMany({}, function(err){
      if(!err){
        res.send("Success deleting all articles in db");
      } else {
        res.send(err);
      }
    });
  });

// app.get("/articles", function(req,res){
//   Articles.find({}, function(err,results){
//     // console.log(results);
//     if (!err) {
//       res.send(results);
//     } else {
//       res.send(err);
//     }
//     // res.render("home", {articleArray: results});
//   });
// });
//
// app.post("/articles", function(req,res){
//   // console.log(req.body.title);
//   // console.log(req.body.content);
//   const article = new Articles({
//     title: req.body.title,
//     content: req.body.content
//   }); //creates new entry for the articles collection
//   article.save(function(err){
//     if(!err){
//       res.send("Success adding new article to db");
//     } else {
//       res.send(err);
//     }
//   }); //saves this new entry into the actual articles collection in db
//
//   // console.log(req.body.params.content);
// });
//
// app.delete("/articles", function(req,res){
//   Articles.deleteMany({}, function(err){
//     if(!err){
//       res.send("Success deleting all articles in db");
//     } else {
//       res.send(err);
//     }
//   });
// });

////////////////////////////////////Requests targeting a specific article////////////////////////////////////
app.route("/articles/:articleTitle")
.get(function(req,res){
  // console.log(req.params);
  Articles.findOne({title: req.params.articleTitle}, function(err,result){
    if (result) {
    res.send(result);
  }else {
    res.send("No articles matching that title name were found");
  }
  });
})
.put(function(req,res){
  Articles.update({title: req.params.articleTitle},
    {
    title: req.body.title,
    content: req.body.content
  }, {overwrite: true},
  function(err,result){
    if (!err){
      res.send("success replacing one document with another");
    }else{
      res.send(err);
    }
  });
  })
.patch(function(req,res){
  Articles.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err,result){
      if(!err){res.send("success updating the properties of a document");}
      else {res.send(err);}
    }
  );}
)
.delete(function(req,res){
  Articles.deleteOne({
    title: req.params.articleTitle
  }, function(err){
    if(!err){res.send("success deleting a particular article")} else {
      res.send(err);
    }
  });
}
);


app.listen("3000", function(){
  console.log("server listening on port3000");
})
