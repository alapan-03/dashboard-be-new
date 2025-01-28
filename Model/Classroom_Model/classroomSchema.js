const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  className: { 
    type: String, 
    required: true 
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher', // Reference to the Teacher model
    required: true 
  },
  // students: [{ 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Student' 
  // }],
  classroomCode: { 
    type: String, 
    unique: true, 
  },
  subject: { 
    type: String, // Subject or course name
    required: true 
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  },
  resources: [{ 
    type: String // List of resource URLs or paths
  }]
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
