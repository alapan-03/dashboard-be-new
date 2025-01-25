const Subject = require("../../Model/Classroom_Model/SubjectModel")

exports.subjectOfClassroom = async (req, res) => {
    try{
        const sub = await Subject.findOne({classroomId: req.params.classroomId});

        res.status(200).json({
            status: "success",
            subject: sub
        })
    }
    catch(err){
        res.status(500).json({
            status: "fail",
            messsage: err.messsage
        })
    }
}

// module.exports = {listAllSubject}