const mongoose = require("mongoose");

const roadmapSchema = mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Empty classroom! Subject can only be built inside a classroom"]
    },
    classroomId: {
        type: mongoose.Schema.ObjectId,
        // required: [true, "Empty classroom!"]
    }
})

const roadmapModel = mongoose.model(roadmapSchema);

module.exports = roadmapModel;