// controllers/assignmentController.js
const Assignment = require('../../Model/Classroom_Model/assignmentSchema'); // Adjust the path as needed

// Get all assignments
const getAllAssignment = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('topicId', 'name')  // Populate fields if needed
      .populate('teacherId', 'name'); // Populate fields if needed
    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOneAssignmentById = async (req, res) => {
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

module.exports = {
  getAllAssignment,
  getOneAssignmentById
};
