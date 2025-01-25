const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../../Model/User_Model/studentSchema'); // Import Student model
const Teacher = require('../../Model/User_Model/teacherSchema'); // Import Teacher model

const JWT_SECRET = process.env.JWT_SECRET; // Replace this with your actual JWT secret

// Register a new student
exports.registerStudent = async (req, res) => {
  const { name, email, password, enrolledClassrooms, assignments, totalWatchTime } = req.body;

  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and save student
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new student object
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      enrolledClassrooms: enrolledClassrooms || [],  // Default to an empty array if not provided
      assignments: assignments || [],  // Default to an empty array if not provided
      totalWatchTime: totalWatchTime || { daily: [], weeklyAverage: 0 }  // Default watch time
    });

    const savedStudent = await newStudent.save();
    console.log(savedStudent);
    res.status(201).json({ message: 'Student registered successfully', student: savedStudent });
  } catch (error) {
    res.status(500).send('Error during registration');
    console.error('Error during registration:', error);
  }
};


// Login a student
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      console.log("Student Not Found");
      return res.status(404).json({ message: 'Student not found' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id, email: student.email }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful', accountType: 'student' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register a new teacher
exports.registerTeacher = async (req, res) => {
  const { name, email, password, bio, socialLinks } = req.body;

  try {
    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    // Hash password and save teacher
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      bio,
      socialLinks,
    });

    const savedTeacher = await newTeacher.save();
    console.log(savedTeacher);
    res.send('Received the data of teacher');
  } catch (error) {
    res.status(500).send('Error during registration');
    console.error('Error during registration:', error);
  }
};

// Login a teacher
exports.loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: teacher._id, email: teacher.email }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful', accountType: 'teacher' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
