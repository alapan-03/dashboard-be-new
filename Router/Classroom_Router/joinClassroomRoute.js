const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")

const joinClassroomController = require('../../Controller/Classroom_Controller/joinClassroomController');

// Route to join a classroom
router.post('/join', bodyParser.json() ,joinClassroomController.joinClassroom);
module.exports = router;
