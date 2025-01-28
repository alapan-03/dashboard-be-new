const express = require('express');
const router = express.Router();
const { submitAssignment, getLeaderboard } = require('../../Controller/Classroom_Controller/studentAssignmentController'); // Import student assignment controller


router.post('/submit', submitAssignment);
router.get('/leaderboard/:assignmentId', getLeaderboard);

module.exports = router;
