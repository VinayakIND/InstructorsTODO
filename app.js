var createError = require('http-errors');
//import mongoose 
const mongoose = require('mongoose');

//express package/module import.
var express = require('express');
//To set up path
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

const passport = require('passport');
const session = require('express-session');

const localStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//for database credentials.
require('dotenv').config( { path:
  'variables.env'
});
mongoose.connect(process.env.DATABASE);

// view engine setup
//app.VERB; verb = set, get, post, .....
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//This takes the raw html text and allow us to use them as seperate elements.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:  true}));

//session and initialize passport. 
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');
passport.use(User.createStrategy());

//Read/write user login and registration info to mongo db.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

//Google OAuth authentication.
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 

passport.use(new GoogleStrategy ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  (request, accessTokrn, refreshToken, profile, done) => {
    User.findOrCreate({
      username: profile.emails[0].value },
      (err,user) => done(err,user));
    }
));



//All staic content like images, CSS, JS goes in public. 
app.use(express.static(path.join(__dirname, 'public')));

//if localhost:3000 then route it to indexRouter, i.e,. /routes/index.
app.use('/', indexRouter);

//if localhost:3000/users then route it to usersRouter, i.e,. /routes/users. 
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Finally export the app so other files can use it.
module.exports = app;

/*Twitter OAuth */
/* Use module */
var OAuth = require('oauth').OAuth
  , oauth = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      process.env.twitter_consumer_key,
      process.env.twitter_consumer_secret,
      "1.0",
      "https://instructors-to-do.herokuapp.com/auth/twitter/callback",
      "HMAC-SHA1"
    );

// /auth/twitter
app.get('/auth/twitter', function(req, res) {
 
    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
      if (error) {
        console.log(error);
        res.send("Authentication Failed!");
      }
      else {
        req.session.oauth = {
        token: process.env.oauth_token,
        token_secret: process.env.oauth_token_secret
        };
        console.log(req.session.oauth);
        res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
      }
    });
     
});

//redirect to the instructorsTODO site.	
app.get('/auth/twitter/callback', function(req, res, next) {
 
  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    var oauth_data = req.session.oauth;
 
    oauth.getOAuthAccessToken(
      oauth_data.token,
      oauth_data.token_secret,
      oauth_data.verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        if (error) {
          console.log(error);
          res.send("Authentication Failure!");
        }
        else {
          req.session.oauth.access_token = oauth_access_token;
          req.session.oauth.access_token_secret = oauth_access_token_secret;
          console.log(results, req.session.oauth);
          res.send("Authentication Successful");
          res.redirect('/instructor'); 
        }
      }
    );
  }
  else {
    res.redirect('/login'); // Redirect to login page
  }
 
});