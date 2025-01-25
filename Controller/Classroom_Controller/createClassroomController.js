const Classroom = require('../../Model/Classroom_Model/classroomSchema');
const Teacher = require('../../Model/User_Model/teacherSchema');

// To generate unique classroom code function
const generateUniqueClassroomCode = async () => {
  let isUnique = false;
  let newCode = '';

  // Loop until a unique code is found
  while (!isUnique) {
    newCode = Math.random().toString(36).substr(2, 8).toUpperCase(); // Generates a random 8-character code
    const existingClassroom = await Classroom.findOne({ classroomCode: newCode });

    // If no classroom is found with the generated code, it is unique
    if (!existingClassroom) {
      isUnique = true;
    }
  }

  return newCode;
};

exports.createClassroomController = async (req, res) => {
  req.user = "66e1aa3b33737016e74f2d60"
  try{
    const { className, teacher, classroomCode, subject, createdDate, resources } = req.body;
    const existingClassroom = await Classroom.findOne({ classroomCode });
      if (existingClassroom) {
        return res.status(400).json({ message: 'Classroom already exists' });
      }

      const teacherS = await Teacher.findById(req.user);
      
      const uniqueCode = await generateUniqueClassroomCode();
      const newClassroom = new Classroom({ 
        className,
        teacher:req.user, 
        classroomCode: uniqueCode,
        subject,
        createdDate: Date.now(),
        resources
     });

     
     const savedClassroom = await newClassroom.save();

     teacherS.classrooms.push(savedClassroom?._id);

     await teacherS.save();

     console.log(savedClassroom);
     res.status(200).json({
      status: "success",
      savedClassroom
  })
}
catch(err){
  res.status(500).json({
      status: "fail",
      messsage: err.messsage
  })
}
}