const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },

  classrooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
  }],
//   subjectSpecialization: { 
//     type: [String], // List of subjects the teacher specializes in
//     required: true 
//   },
//   courses: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Course' // Reference to Course model (assuming there's a Course schema)
//   }],
//   dateOfJoining: { 
//     type: Date, 
//     default: Date.now 
//   },
//   profileImage: { 
//     type: String // URL or path to the profile image
//   },
  bio: { 
    type: String // Short biography or description
  },
  socialLinks: { 
    linkedin: { type: String }, 
    twitter: { type: String }, 
    website: { type: String }
  },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
