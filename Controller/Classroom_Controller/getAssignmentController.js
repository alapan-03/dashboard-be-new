// // controllers/assignmentController.js
// const Assignment = require('../../Model/Classroom_Model/assignmentSchema'); // Adjust the path as needed
// const mongoose = require('mongoose');
// // const ObjectId = new mongoose.Types.ObjectId;

// // Get all assignments
exports.getAssignmentDetails = async (req, res) => {
  try {
    console.log(req.params.topicId)
    const topicId = new mongoose.Types.ObjectId("66e1dc614e1cfd7a2c31c17a");
    // const topicId = ObjectId(req.params.topicId);
        const assignments = await Assignment.find({topicId:req.params.topicId})
      .populate('topicId', 'name')  // Populate fields if needed
      .populate('teacherId', 'name'); // Populate fields if needed
    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// const assignmentDetails = async (req, res) => {
//   try{
//     const assign = await Assignment.findById(req.params.assignId);

//     res.status(200).json(assign);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// }

// module.exports = {
//   getAssignmentDetails,
//   assignmentDetails
// };


// controllers/assignmentController.js
const Assignment = require('../../Model/Classroom_Model/assignmentSchema'); // Adjust the path as needed
const mongoose = require('mongoose');
// const ObjectId = new mongoose.Types.ObjectId;

// Get all assignments
exports.getAllAssignment = async (req, res) => {
  try {
    console.log(req.params.topicId)
    const topicId = new mongoose.Types.ObjectId("66e1dc614e1cfd7a2c31c17a");
    // const topicId = ObjectId(req.params.topicId);
        const assignments = await Assignment.find({topicId:req.params.topicId})
      .populate('topicId', 'name')  // Populate fields if needed
      .populate('teacherId', 'name'); // Populate fields if needed
    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getOneAssignmentById = async (req, res) => {
  try {
    const {assignmentId} = req.params;
    const assignments = await Assignment.findById(assignmentId)
      .populate('topicId', 'name')  // Populate fields if needed
      .populate('teacherId', 'name'); // Populate fields if needed
    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// module.exports = {
//   getAllAssignment,
//   getOneAssignmentById
// }
exports.assignmentDetails = async (req, res) => {
  try{
    const assign = await Assignment.findById(req.params.assignId);

    res.status(200).json(assign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

// module.exports = {
//   // getAssignmentDetails,
//   assignmentDetails
// }