//Import the required modules.
const passport = require('passport');
const User = require('../models/User');

//Direct the user to the registeration page.
exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Register',
    warning: '',
    user: req.user,
  });
};

//This method allows the user to register using post request.
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
      return;
    }
 });
};

//THis method allows the user to login.
exports.loginForm = (req, res) => {
  const messages = req.session.messages || [];

  // clear session message
  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages,
    user: req.user,
  });
};

