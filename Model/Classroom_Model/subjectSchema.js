const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: [true, "A subject name cannot be empty!"]
    },
    classroomId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Empty classroom! Subject can only be built inside a classroom"]
    },

})

module.exports  = mongoose.model('Subject',subjectSchema);