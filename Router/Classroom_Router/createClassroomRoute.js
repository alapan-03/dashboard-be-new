const express = require('express');
const router = express.Router();
const createClassroomController = require('../../Controller/Classroom_Controller/createClassroomController');

router.post('/createClassroom', createClassroomController.createClassroomController);

module.exports = router;