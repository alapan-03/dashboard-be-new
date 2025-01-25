const express = require('express');
const router = express.Router();
const { submitAssignment, getLeaderboard } = require('../../Controller/Classroom_Controller/studentAssignmentController'); // Import student assignment controller
const {getAssignmentDetails, assignmentDetails} = require("./../../Controller/Classroom_Controller/getAssignmentController")

router.post('/submit', submitAssignment);
router.get('/leaderboard/:assignmentId', getLeaderboard);
router.get('/getAssignment/:topicId', getAssignmentDetails);
router.get('/assignmentDetails/:assignId', assignmentDetails);

module.exports = router;
