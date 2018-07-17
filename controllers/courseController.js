const Course = require('../models/Course');
//const url = require('url');

/* Return home page with the title and the content */
exports.homePage = (req, res, next) => {
    res.render('index', { title: 'Instructors TO DO App',
                          message: 'Welcome to the Instructors TO DO list web application.',
   });
};

// Return the courses page with the title and the message to the course.ejs view.
exports.getCourses = (req, res) => {
  Course.find((err, courses) => {
    if (err) {
      res.render('error');
    } else {
      res.render('courses', {
        title: 'Courses',
        message: 'Here is the list of all the courses: ',
        courses,
        //user: req.user,
      });
    }
  });
};