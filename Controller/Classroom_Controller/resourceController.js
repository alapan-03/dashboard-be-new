// const User = require("../models/userModel");
const Resource = require('./../../Model/Classroom_Model/ResourceModel');
const videoResource = require('./../../Model/Classroom_Model/resourceVideoModel');

exports.uploadResource = async (req, res) => {
    try {
        // Destructure required fields from the request body
        const { name, subjectId, topicId, classroomId } = req.body;
        const fileUrls = req.files.map((file) => file.path); // Cloudinary URLs for uploaded files

        // Find the existing resource by topicId and classroomId (you can adjust based on your criteria)
        const existingResource = await Resource.findOne({ topicId, classroomId });

        if (existingResource) {
            // If the resource exists, update it by adding the new file URLs
            existingResource.name.push(...name.replace(/\s/g, ''))
            existingResource.fileUrl.push(...fileUrls);
            await existingResource.save();

            return res.status(200).json({
                status: 'success',
                data: existingResource,
                message: 'Resource updated with new file URLs'
            });
        }

        // If the resource does not exist, create a new one
        const newResource = await Resource.create({
            name,
            subjectId,
            topicId,
            classroomId,
            fileUrl: fileUrls
        });

        res.status(201).json({
            status: 'success',
            data: newResource,
            message: 'New resource created'
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};


exports.deleteResource = async (req, res) => {
    let { resourceId } = req.params;
    let { fileName } = req.params;
    fileName = fileName.replace(/\s/g, '');

    try {
        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Find the index of the file in the name array
        const index = resource.name.indexOf(fileName);
        
        if (index === -1) {
            console.log("no filename")
            return res.status(404).json({ message: 'File not found' });
        }

        // Remove the corresponding file name and fileUrl at the same index
        resource.name.splice(index, 1);
        resource.fileUrl.splice(index, 1);

        // Save the updated resource back to the database
        await resource.save();

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




// Update time spent by a user on a resource
exports.updateTimeSpent = async (req, res) => {
    const { resourceId, userId, timeInMinutes } = req.body;
    // timeInMinutes = timeInMinutes*10;

    console.log(timeInMinutes)

    try {
        const resource = await Resource.findById(resourceId);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found!" });
        }

        // Find or create an entry for the user in the resource's timeSpent array
        let userTimeSpent = resource.timeSpent.find(
            (entry) => entry.userId.toString() === userId
        );

        const today = new Date();
        const todayDate = today.toISOString().split('T')[0]; // Get only the date portion

        if (!userTimeSpent) {
            userTimeSpent = {
                userId,
                daily: [{ date: todayDate, timeInMinutes}],
                weeklyAverage: timeInMinutes // Start with today's time
            };
            resource.timeSpent.push(userTimeSpent);
        } else {
            const todayEntry = userTimeSpent.daily.find(
                (entry) => entry.date.toISOString().split('T')[0] === todayDate
            );

            if (todayEntry) {
                todayEntry.timeInMinutes += timeInMinutes;
            } else {
                userTimeSpent.daily.push({ date: todayDate, timeInMinutes });
            }

            // Update weekly average (recalculate the past 7 days)
            const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
            const lastWeekEntries = userTimeSpent.daily.filter(
                (entry) => new Date(entry.date) > oneWeekAgo
            );
            const totalMinutes = lastWeekEntries.reduce(
                (sum, entry) => sum + entry.timeInMinutes, 0
            );
            userTimeSpent.weeklyAverage = totalMinutes / 7;
        }

        await resource.save();
        res.status(200).json({ message: "Time spent updated!", resource });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};



exports.postVideoResource = async(req, res) => {
    try{
        const { name, subjectId, topicId, classroomId, videoUrl } = req.body;

        const video = await videoResource.create({
            name,
            subjectId,
            topicId,
            classroomId,
            // videoUrl: ""
        })

        console.log(video);

        video.videoUrl.push(videoUrl)

        video.save();
        res.status(201).json({
            status: 'success',
            data: video
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}


exports.getAllResource = async (req, res) => {
    try {
        const resource = await Resource.find({topicId: req.params.topicId});

        res.status(200).json({
            status: "success",
            resource
        })
    }
    catch(err){
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.getAllVideoResource = async (req, res) => {
    console.log(req.params?.topicId)
const videos = await videoResource.find({topicId: req.params?.topicId&& req.params.topicId});
    
    console.log(videos);
    res.status(200).json({
        status: "success",
        videos
    })
}