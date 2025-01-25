// const Roadmap = require("./../../Model/Classroom_Model/RoadmapModel");
// const Subject = require("./../../Model/Classroom_Model/SubjectModel");

// exports.addRoadmap = async (req, res) => {
//     try{
//         const roadmap = new Roadmap({
//             subjectId: req.params.subjectId,
//         })

//         await roadmap.save({ validateBeforeSave: false });

//         res.status(200).json({
//             status: "success",
//             roadmap
//         })
//     }
//     catch(err){
//         res.status(500).json({
//             status: "fail",
//             message: err.message
//         })
//     }
// }