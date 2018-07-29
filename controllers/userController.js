const passport = require('passport');
const User = require('../models/User');

exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Register',
    warning: '',
    user: req.user,
  });
};  

exports.register = (req, res, next) => {
  const user = new User({ username: req.body.username });

  User.register(user, req.body.password, (err, account) => {
    if (err) {
      return res.render('register', {
        title: 'Register',
        warning: 'Sorry, that username is already taken.  Try again.',
        user: req.user,
      });
    }
    else {
      next();
    }
});
};

exports.loginForm = (req, res) => {
  const messages = req.session.messages || [];

  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages,
    user: req.user,
  });
};

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.render('error');
    } else {
      res.render('users', {
        title: 'All Users',
        users,
        user: req.user,
      });
    }
  });
};
