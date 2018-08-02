//Import the required modules.
const Course = require('../models/Course');
var fs = require('fs');

//Load instructor page with the courses. 
exports.instructor = async (req, res) => {
    const courses = await Course.find().sort({ title: 'asc' });
  
    res.render('instructor', {
      title: 'Instructor',
      courses,
      user: req.user,
    });
  };

  //Create and save a course.
exports.createCourse = (req, res) => {    
    try{
      filePath = '../instructorsTODO/public/uploads/java.txt'
      const course = new Course(req.body);
      course.file.data = fs.readFileSync(filePath);
      course.file.contentType = 'string/txt';
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
      //var imageblob = courses.file;
      //var image = document.createElement('image');
      //    image.src = 'data:image/png;base64,' + imageblob;
      //    document.appendChild(image); 
      res.render('instructor', {
        title: 'Instructors - Courses',
        message: 'Here is the list of all the courses: ',
        courses,
        user: req.user,
      });
    }
  });
};

//Take the user to add course page only if he's authenticated.
exports.addCourse = (req, res) => {
  res.render('addCourse', {
    title: 'Add Course',
    user: req.user,
  });
};

//method to allow user to delete the courses.
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

//This method allows the user to edit the courses.
exports.editCourse = (req, res) => {
  Course.findById({ _id: req.params.id }, (err, course) => {
      if (err){
        console.log(err)}
      else{
          res.render('editCourse', {
          title: 'Edit',
          course,
          user: req.user,
  
        });
      }
  });
}; 

//This method redirects the user to the appropriate page once they've edited the course. 
exports.updateCourse = (req, res) => {
  Course.update({_id: req.params.id}, req.body, (err) => {
    if (err){
      console.log(err);
    }
    else {
      res.redirect('/instructor');
    }
  });
};

//This method allows the user to upload/add a text file (.txt).
exports.fileUpload = function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('../public/uploads/filename.jpg', function(err) {
    if (err)  
      return res.status(500).send(err);

    res.send('File uploaded!');
    res.redirect('/instructor');
  });
};