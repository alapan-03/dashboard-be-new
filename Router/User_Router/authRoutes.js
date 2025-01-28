const express = require('express');
const router = express.Router();
const authController = require('../../Controller/User_Controller/authController'); // Import auth controller

// Student routes
router.post('/register', authController.registerStudent);
router.post('/login', authController.loginStudent);

// Teacher routes
router.post('/teacherRegister', authController.registerTeacher);
router.post('/teacherLogin', authController.loginTeacher);

// Route to verification of Token
router.post('/verifyAuth', authController.verifyAuth);

module.exports = router;
