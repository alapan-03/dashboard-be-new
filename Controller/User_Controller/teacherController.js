const Teacher = require('./../../Model/User_Model/teacherSchema'); 

exports.getMeTeacher = async (req, res) => { 
    try {
        // Debugging step: Log the request body to check if userId is being sent correctly
        console.log("Request Body:", req.body);

        // Make sure `userId` exists in the request body
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "userId is required in the request body" });
        }

        // Debugging step: Log the userId to ensure it is correctly extracted
        console.log("Teacher Controller - User ID:", req.body.userId);

        // Fetch teacher by userId and populate classrooms and students in each classroom
        const teacher = await Teacher.findOne({ _id: req.body.userId }).populate({
            path: 'classrooms',  // Populate classrooms
            populate: {
                path: 'students',  // Populate students within each classroom
                model: 'Student'   // Ensure you're referring to the correct model for students
            }
        });

        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        // Debugging step: Check the populated classrooms
        console.log(teacher.classrooms);

        // Return the populated classrooms
        res.status(200).json({ success: true, classrooms: teacher.classrooms });

    } catch (error) {
        console.error("Error in getMeTeacher:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
