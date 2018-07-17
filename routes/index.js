var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Instructors TO DO App',
    message: 'Welcome to the Instructors TO DO list web application.'
});
});

/* /courses */
router.get('/courses', function(req, res, next){
  res.render('courses', {
    title: 'Courses',
    message: 'Here is the list of all the courses: '
  })
})

// /login
router.get('/login')

// /register 
router.get('register')


//export the router so other files can use it.
module.exports = router;
