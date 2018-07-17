var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController')

/* GET home page. */
router.get('/', courseController.homePage);

/* /courses */
router.get('/courses', courseController.coursePage);

// /login
router.get('/login')

// /register 
router.get('register')


//export the router so other files can use it.
module.exports = router;
