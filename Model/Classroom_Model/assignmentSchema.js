const mongoose = require('mongoose');

// Helper function to ensure there are at least two options in the options array
function arrayLimit(val) {
  return val.length >= 2;
}

// Define the Assignment Schema with embedded Question structure
const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic', // Reference to the Topic model
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', // Reference to the Teacher model
    required: true
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    options: {
      type: [String], // Array of options for the MCQ
      required: true,
      validate: [arrayLimit, '{PATH} must have at least 2 options'] // Ensures there are at least two options
    },
    correctOptionIndex: {
      type: Number,
      required: true,
      min: 0 // Ensure correctOptionIndex is a valid index within the options array
    }
  }], // Embedding Question structure directly within AssignmentSchema
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
