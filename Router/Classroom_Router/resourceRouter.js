const express = require('express');
const resourceController = require('./../../Controller/Classroom_Controller/resourceController');
const upload = require('./../../Middlewares/Classroom_Middlewares/multerMiddleware'); // The multer configuration file
const bodyParser = require("body-parser")

const router = express.Router();

router.post('/upload', upload.array('file', 10), resourceController.uploadResource);
router.post('/uploadLink', resourceController.postVideoResource);
router.post("/updateTimeSpent", resourceController.updateTimeSpent);
router.post("/postVideoResource", bodyParser.json(), resourceController.postVideoResource);
router.get("/getVideoResource/:topicId", bodyParser.json(), resourceController.getAllVideoResource);
router.get("/getAllResource/:topicId", bodyParser.json(), resourceController.getAllResource);
// router.get("/getAllVideoResource/:topicId", bodyParser.json(), resourceController.getAllVideoResource);
router.delete("/deleteResource/:resourceId/:fileName", bodyParser.json(), resourceController.deleteResource);

module.exports = router;
