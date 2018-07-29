var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController')
const instructorController = require('../controllers/instructorController')

/* GET home page. */
router.get('/', courseController.homePage);

/* /courses */
router.get('/courses', courseController.getCourses);

/* /instructor */
router.get('/instructor', instructorController.getCourses)

// /login
router.get('/login')

// /register 
router.get('register')

//Delete a course.
router.get('/instructor/delete/:id', instructorController.deleteCourse);

//Add a new course
router.get('/add', instructorController.addCourse)
router.post('/add', instructorController.createCourse)


//export the router so other files can use it.
module.exports = router;
