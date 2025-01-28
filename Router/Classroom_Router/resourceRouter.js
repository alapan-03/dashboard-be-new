const express = require('express');
const resourceController = require('./../../Controller/Classroom_Controller/resourceController');
const upload = require('./../../Middlewares/Classroom_Middlewares/multerMiddleware'); // The multer configuration file
const bodyParser = require("body-parser")

const router = express.Router();

router.post('/upload', bodyParser.json(), upload.array('file', 10), resourceController.uploadResource);
router.post('/uploadLink', bodyParser.json(), resourceController.postVideoResource);
router.post("/updateTimeSpent", bodyParser.json(),resourceController.updateTimeSpent);
router.post("/postVideoResource", bodyParser.json(), resourceController.postVideoResource);
router.get("/getVideoResource", bodyParser.json(), resourceController.getAllVideoResource);
router.get("/getAllResource/:topicId", bodyParser.json(), resourceController.getAllResource);
router.delete("/deleteResource/:resourceId/:fileName", bodyParser.json(), resourceController.deleteResource);

module.exports = router;
