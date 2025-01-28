const express = require('express');
const router = express.Router();
const {getClassrooms} = require('../../Controller/Classroom_Controller/createEducationController')

router.post('/createClassroom', getClassrooms);

module.exports = router;