const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.isLoggedIn = (req, res, next) => {
  // first check if user is authenticated
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
};

exports.login = passport.authenticate('local', {
  successRedirect: '/instructor',  
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
});

exports.googlePre = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
});

exports.googlePost = passport.authenticate('google', {
  successRedirect: '/instructor',
  failureRedirect: '/login',
  }
)

exports.twitterPre = passport.authenticate('twitter');

exports.twitterPost = ('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to instructor page.
    res.redirect('/instructor');
  });

