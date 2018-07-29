const Course = require('../models/Course');

exports.instructor = async (req, res) => {
    // use game model to query db for game data
    const courses = await Course.find().sort({ title: 'asc' });
  
    res.render('instructor', {
      title: 'Instructor',
      courses,
      user: req.user,
    });
  };

exports.createCourse = (req, res) => {    
    try{
      const course = new Course(req.body);
      course.save();
      res.redirect('/instructor');
    } catch (err) {
      console.log(err);
    }
};

// Return the courses page with the title and the message to the course.ejs view.
exports.getCourses = (req, res) => {
  Course.find((err, courses) => {
    if (err) {
      res.render('error');
    } else {
      res.render('instructor', {
        title: 'Instructors - Courses',
        message: 'Here is the list of all the courses: ',
        courses,
        //user: req.user,
      });
    }
  });
};

exports.addCourse = (req, res) => {
  res.render('addCourse', {
    title: 'Add Course',
    user: req.user,
  });
};

exports.deleteCourse = (req, res) => {
  Course.remove(
    { _id: req.params.id },
    async (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/instructor');
      }
    },
  );
};