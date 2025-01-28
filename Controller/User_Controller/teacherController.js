const Teacher = require('./../../Model/User_Model/teacherSchema'); 


exports.getMeTeacher = async (req, res) => {
    try{
          req.user = "66e1aa3b33737016e74f2d60"
        const teacher = await Teacher.findOne({_id: req.user}).populate({
            path: 'classrooms',
            // populate: {
            //     path: 'teacher' // Populate teacher within each class
            // }
        });;

        res.status(200).json({ success: true, teacher });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}