const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
    name: {
        type: [String],
        // required: [true, "Topic name is required!"]
    },
    subjectId: {
        type: mongoose.Schema.ObjectId,
        // required: [true, "Empty subject! Subject can only be built inside a classroom"]
    },
    topicId: {
        type: mongoose.Schema.ObjectId,
        // required: [true, "Empty topic!"]
    },
    classroomId: {
        type: mongoose.Schema.ObjectId,
        // required: [true, "Empty classroom!"]
    },
    fileUrl: {   // New field to store the URL of the uploaded file
        type: [String],
        required: [true, "File URL is required!"]
    },
    timeSpent: [
        {
            userId: {
                type: mongoose.Schema.ObjectId, 
                ref: "User", // Reference to User model
                required: true
            },
            daily: [{
                date: { type: Date, required: true },
                timeInMinutes: { type: Number, required: true } // Time spent in minutes
            }],
            weeklyAverage: {
                type: Number, // Calculated field, weekly average in minutes
                default: 0
            }
        }
    ]
});

const resourceModel = mongoose.model("Resource", resourceSchema);

module.exports = resourceModel;
