const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
    topicName: {
        type: String,
        required: [true, "Topic name is required!"]
    },
    description: String,
    // subjectId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Subject',
    //     required: [true, "Empty subject! Subject can only be built inside a classroom"]
    // },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher', // Reference to the Teacher model
        required: true
      },
    classroomId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Empty classroom!"]
    },
    status: {
        type: String,
        default: "Todo"
    },
    
})

module.exports = mongoose.model('Topic', topicSchema);
