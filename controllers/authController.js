//Import the required modules.
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

//method to check if the user is logged in.
exports.isLoggedIn = (req, res, next) => {
  // first check if user is authenticated
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
};

//method to authenticate the user.
exports.login = passport.authenticate('local', {
  successRedirect: '/instructor',  
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
});

//method to check user authentication using google OAuth and set the scope/features to be granted to us for use.
exports.googlePre = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
});

//After the user is authenticated, redirect them to the appropriate page.
exports.googlePost = passport.authenticate('google', {
  successRedirect: '/instructor',
  failureRedirect: '/login',
  }
)

//method to check user authentication using Twitter OAuth and set the scope/features to be granted to us for use.
exports.twitterPre = passport.authenticate('twitter');

//After the user is authenticated, redirect them to the appropriate page.
exports.twitterPost = passport.authenticate('twitter', { 
  successRedirect: '/instructor',
  failureRedirect: '/login', 
  }
);

