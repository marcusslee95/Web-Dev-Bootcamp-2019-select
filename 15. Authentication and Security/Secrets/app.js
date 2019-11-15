require('dotenv').config();
console.log(process.env.SECRET);
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(session({
  secret: 'Ill keep u my doity widdo secwittttt',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/secretsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true); //<- purely just for getting rid of deprecation warning


//creating mongoose models aka. things you use to interact with aka. do CRUD on a collection in mongoDB
// const userSchema = {
//   email: String,
//   password: String
// };
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secrets: [String]
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// var secret = "I'll keep you my Doity Widdo Secwittttt~";
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"]});
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"]});

const User = mongoose.model("user", userSchema);
// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// console.log(process.env.CLIENT_ID);
// console.log(process.env.ClIENT_SECRET);

passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secret",
    // userProfileURL: "https://www.googleapis.com/autho2/v3/userinfo"
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"

  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
//
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

app.get("/", function(req, res) {
  res.render("home");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secret',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to secrets page.
    res.redirect('/secrets');
  });

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/secrets", function(req,res){
  // Make secrets page accessible to everyone even not logged in people too
  // User.find({secrets:{$ne:null}}, function(err,results){
  //   res.render("secrets", {usersWithSecrets: results});
  // })


  if (req.isAuthenticated()) {//cheecks to see if have cookie
    // res.render("secrets");
    User.find({secrets:{$ne:null}}, function(err,results){
      res.render("secrets", {usersWithSecrets: results});
    })
  } else {
    res.redirect("/login"); //if not authenticated aka. no cookie then no that either hey aren't logged on or registered so have to go back to log on
  }
});

app.get("/submit", function(req,res){
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", function(req,res){
  const submittedSecret = req.body.secret;
  //Find current user + save secret into them

  //How to find? When initiate new login session, passport saves everything about user in the request variable
//   console.log(req.user);
//   ^^ gives {
//   _id: 5dc9f4d772295e214bc61e94,
//   username: 'user@passportlocalmongoose.com',
//   __v: 0
// }

// insert secret into that document
// and then render it in ejs
  User.findById(req.user._id, function(err,result){
    if (err){
      console.log(err);
    } else {
      if (result){
        // result.secret = submittedSecret;
        result.secrets.push(submittedSecret);
        result.save(function(){
          res.redirect("/secrets");
        }); //save this updated user into the db and once done that redirect to secrets page to see secrets
      }
    }
  });
});

app.get("/logout", function(req,res){
  req.logOut();//destroys cookie
  res.redirect("/");

});


// console.log(md5("123456"));
app.post("/register", function(req, res) {
  // ***** BEFORE USING PASSPORT.JS TO MAINTAIN SESSION AKA. DURING BROWSER-SERVER INTERACTION HAVING SERVER KNOW THIS IS THE SAME BROWSER ACROSS ALL THE PAGES IT VISITS
  // const username = req.body.username;
  // // const pw = req.body.password;
  // // const pw = md5(req.body.password);
  // bcrypt.hash(req.body.password, 10, function(err, result) {
  //   const newUser = new User({
  //     email: username,
  //     password: result
  //   });
  //   newUser.save(function(err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       // they were successfully added to db in the users collection
  //       res.render("secrets");
  //     }
  //   });
  // });

  User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/register");//so that they can try registering again
      } else {
        passport.authenticate("local")(req, res, function(){//give them cookie
          res.redirect("/secrets");
        });
      }
    });
});

app.post("/login", function(req, res) {
  // ***** BEFORE USING PASSPORT.JS TO MAINTAIN SESSION AKA. DURING BROWSER-SERVER INTERACTION HAVING SERVER KNOW THIS IS THE SAME BROWSER ACROSS ALL THE PAGES IT VISITS
  // User.findOne({
  //   email: req.body.username
  // }, function(err, foundUser) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     // was there a user with matching emails
  //     if (foundUser) {
  //       //if user passed in credentials of someone that has registered aka. in our db
  //       // if(foundUser.password === req.body.password){
  //       //   res.render("secrets");
  //       // }
  //       // Load hash from your password DB.
  //       bcrypt.compare(req.body.password, foundUser.password, function(err, results) {
  //         if (results == true) {
  //           res.render("secrets");
  //         }
  //       });
  //     }
  //   }
  // });
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err){
    if (err) {
      console.log(err);
    }else {
      passport.authenticate("local")(req, res, function(){//give them cookie
        res.redirect("/secrets");
      });
    }
  });

});


app.listen("3000", function() {
  console.log("server listening on port 3k");
});
