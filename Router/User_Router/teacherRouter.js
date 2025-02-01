const express = require('express');
const router = express.Router();
const teacherController = require('./../../Controller/User_Controller/teacherController'); // Import auth controller
const bodyparser = require("body-parser")

// Student routes
router.post('/meTeacher', bodyparser.json() ,teacherController.getMeTeacher);
// router.post('/videoWatchTime/:videoId', bodyparser.json() ,studentController.userWatchTime);
// router.get('/get-watch-time', studentController.getWatchTime);
// router.post('/updateResourceTime', bodyparser.json(),studentController.updateResourceTime);


module.exports = router;
