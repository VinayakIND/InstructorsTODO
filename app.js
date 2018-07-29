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
