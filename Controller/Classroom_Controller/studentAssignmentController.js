const StudentAssignment = require('../../Model/Classroom_Model/studentAssignmentSchema');
const Assignment = require('../../Model/Classroom_Model/assignmentSchema');
const Student = require('../../Model/User_Model/studentSchema');

const submitAssignment = async (req, res) => {
  // console.log("Post req reached")
  const { assignmentId, studentId, correctAnswers, answers, startTime } = req.body;

  const isFound = await StudentAssignment.findById(studentId)

  if(isFound) {
    console.log("Already Submitted");
    return res.status(409).json({ message: 'Assignment already submitted' });
  }
  const endTime = Date.now();
  const timeTaken = Math.round((endTime - startTime) / 1000); // Time in seconds

  try {
    const studentAssignment = new StudentAssignment({
      assignmentId,
      studentId:"",
      answers,
      correctAnswers,
      timeTaken
    });

    await studentAssignment.save();

    return res.status(201).json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error submitting assignment', error });
  }
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
  const { assignmentId } = req.params;

  try {
    // Fetch submissions for the given assignment and populate the student name
    const submissions = await StudentAssignment.find({ assignmentId })
      .populate('studentId', 'name')  // Populate studentId with only the 'name' field

    // Log populated submissions to check if studentId is populated correctly
    console.log(submissions);

    // Check if there are any submissions
    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ message: 'No submissions found for this assignment.' });
    }

    // Sort submissions by correctAnswers first, then by timeTaken
    const sortedSubmissions = submissions.sort((a, b) => {
      if (b.correctAnswers !== a.correctAnswers) {
        return b.correctAnswers - a.correctAnswers;
      }
      return a.timeTaken - b.timeTaken;
    });

    // Return sorted submissions in the response
    return res.status(200).json(sortedSubmissions);
  } catch (error) {
    // Handle errors and return error response
    return res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
};




module.exports = { submitAssignment, getLeaderboard };
