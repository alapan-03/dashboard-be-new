const Classroom = require('../../Model/Classroom_Model/classroomSchema');
const Student = require('../../Model/User_Model/studentSchema');

// Join a classroom
exports.joinClassroom = async (req, res) => {
  const { classroomCode, studentId } = req.body;

  try {
    // Find the classroom by its unique code
    const classroom = await Classroom.findOne({ classroomCode });
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Ensure classroom.students is an array
    const students = classroom.students || [];

    // Check if the student is already in the classroom
    if (students.includes(studentId)) {
      return res.status(400).json({ message: 'Student already enrolled in this classroom' });
    }

    // Add the student to the classroom's student list
    students.push(studentId);
    classroom.students = students; // Make sure to update the classroom students array
    await classroom.save();

    // Update the student's enrolled classrooms
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.enrolledClassrooms.push(classroom._id);
    await student.save();

    res.status(200).json({ message: 'Student successfully joined the classroom', classroom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

