const express = require('express');
const router = express.Router();
const studentController = require('./../../Controller/User_Controller/studentController'); // Import auth controller
const bodyparser = require("body-parser")

// Student routes
router.get('/studentClassrooms/:studentId', bodyparser.json() ,studentController.getMe);
router.post('/videoWatchTime/:videoId', bodyparser.json() ,studentController.userWatchTime);
router.get('/get-watch-time', studentController.getWatchTime);
router.post('/updateResourceTime', bodyparser.json(),studentController.updateResourceTime);
router.post('/updateCoin', studentController.updateCoins);


module.exports = router;
