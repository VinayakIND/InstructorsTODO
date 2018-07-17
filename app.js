var createError = require('http-errors');
//import mongoose 
const mongoose = require('mongoose');

//express package/module import.
var express = require('express');
//To set up path
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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
