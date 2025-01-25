const Subject = require('../../Model/Classroom_Model/subjectSchema'); // Import Subject model
const Topic = require('../../Model/Classroom_Model/topicSchema'); // Import Topic model
const Assignment = require('../../Model/Classroom_Model/assignmentSchema'); // Import Assignment model

// Create a new subject
exports.createSubject = async (req, res) => {
  const { subjectName, classroomId } = req.body;

  try {
    const newSubject = new Subject({
      subjectName,
      classroomId,
    });

    const savedSubject = await newSubject.save();
    console.log(savedSubject);
    res.send('Received the data of Subject');
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).send('Error creating subject');
  }
};

// Create a new topic
exports.createTopic = async (req, res) => {
  req.user = "66e1aa3b33737016e74f2d60"

  const { topicName, description,subjectId, teacherId, classroomId } = req.body;

  try {
    const newTopic = new Topic({
      topicName,
      description,
      // subjectId,
      teacherId:  req.user,
      classroomId,
    });

    const savedTopic = await newTopic.save();
    console.log(savedTopic);
    res.send('Received the data of Topic');
  } catch (error) {
    console.error('Error creating topic:', error);
    res.status(500).send('Error creating topic');
  }
};


exports.getAllTopic = async (req, res) => {  //get all topic by subject id
  try{
      const topic = await Topic.find({classroomId: req.params.classId});

      if(!topic){
          return res.status(404).json({
              status:"fail",
              message: "No topic is found"
          })
      }

      res.status(200).json({
          status:"success",
          topic
      })
  }
  catch(err){
      res.status(500).json({
          status: "fail",
          message: err.message
      })
  }
}

// Create a new assignment
exports.createAssignment = async (req, res) => {
  const { title, topicId, teacherId, questions, dueDate } = req.body;

  try {
    const newAssignment = new Assignment({
      title,
      topicId,
      teacherId,
      questions,
      createdAt: Date.now(),
      dueDate,
    });

    const savedAssignment = await newAssignment.save();
    console.log(savedAssignment);
    res.send('Received the data of Assignment');
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).send('Error creating assignment');
  }
};
