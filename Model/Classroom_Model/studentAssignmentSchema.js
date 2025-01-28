const mongoose = require('mongoose');

const StudentAssignmentSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  answers: [{
    questionText: {
      type: String,
      required: true
    },
    selectedOption: {
      type: String,
      required: true
    }
  }],
  correctAnswers: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  timeTaken: { // in seconds
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('StudentAssignment', StudentAssignmentSchema);
