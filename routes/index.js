var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController')
const instructorController = require('../controllers/instructorController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

/* GET home page. */
router.get('/', courseController.homePage);

/* /courses */
router.get('/courses', courseController.getCourses);

/* /instructor */
router.get('/instructor', authController.isLoggedIn, instructorController.getCourses)

// /login
router.get('/login')

// /register 
router.get('register')

//Delete a course.
router.get('/instructor/delete/:id', instructorController.deleteCourse);

//Edit a course.
router.get('/edit/:id', authController.isLoggedIn, instructorController.editCourse);
router.post('/edit/:id', authController.isLoggedIn, instructorController.updateCourse);

//Get image from mongodb and display it. 
//router.get('/instructor/image/:id', instructorController.getImage);

//Add a new course
router.get('/add', authController.isLoggedIn, instructorController.addCourse)
router.post('/add', authController.isLoggedIn, instructorController.createCourse)

//Register Login and logout.
router.get('/register', userController.registerForm);
router.post('/register', userController.register);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/courses');
});

router.get('/google', authController.googlePre);
router.get('/google/callback', authController.googlePost);

router.get('/twitter', authController.twitterPre);
router.get('/twitter/callback', authController.twitterPost);

//For file upload.
router.post('/upload', instructorController.fileUpload);



//export the router so other files can use it.
module.exports = router;
