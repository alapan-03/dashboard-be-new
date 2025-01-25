const express = require('express');
const router = express.Router();
const bodyparser = require("body-parser")
const educationController = require('../../Controller/Classroom_Controller/createEducationController'); // Import education controller
const { getOneAssignmentById, getAllAssignment } = require('../../Controller/Classroom_Controller/getAssignmentController');

// Route to create a new subject
router.post('/createSubject', educationController.createSubject);

// Route to create a new topic
router.post('/createTopic', bodyparser.json(), educationController.createTopic);

router.get('/getAllTopics/:classId', educationController.getAllTopic)

// Route to create a new assignment
router.post('/createAssignment', educationController.createAssignment);

router.get('/getAssignment/:assignmentId', getOneAssignmentById);

module.exports = router;
