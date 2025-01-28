const VideoResource = require('./../../Model/Classroom_Model/resourceVideoModel');
const User = require('./../../Model/User_Model/studentSchema'); 


exports.getMe = async (req, res) => {
    try{
        console.log("req reached");
        const student = await User.findOne({_id: req.params.studentId}).populate({
            path: 'enrolledClassrooms',
            populate: {
                path: 'teacher' // Populate teacher within each class
            }
        });;

        res.status(200).json({ success: true, student });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Updates watch time on a particular resource on Resource Model as well as a student's watch time on Student Model
exports.userWatchTime = async (req, res) => {
    const { userId, videoId, timeSpent } = req.body;

    try {
        // Step 1: Update video watch time
        const video = await VideoResource.findById(req.params.videoId);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        const userRecord = video.timeSpent.find((record) => record.userId.equals(userId));
        const today = new Date().toISOString().split('T')[0];

        if (userRecord) {
            const dailyRecord = userRecord.daily.find((d) => d.date.toISOString().split('T')[0] === today);
            if (dailyRecord) {
                dailyRecord.timeInMinutes += timeSpent;
            } else {
                userRecord.daily.push({ date: new Date(), timeInMinutes: timeSpent });
            }
        } else {
            video.timeSpent.push({
                userId,
                daily: [{ date: new Date(), timeInMinutes: timeSpent }],
            });
        }

        await video.save();

        // Step 2: Update user's total watch time
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const userDailyRecord = user.totalWatchTime.daily.find((d) => d.date.toISOString().split('T')[0] === today);
        if (userDailyRecord) {
            userDailyRecord.timeInMinutes += timeSpent;
        } else {
            user.totalWatchTime.daily.push({ date: new Date(), timeInMinutes: timeSpent });
        }

        // Recalculate weekly average
        user.calculateWeeklyAverage();

        await user.save();

        res.status(200).json({ success: true });

    } catch (error) {
        console.error('Error updating watch time:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// app.get('/api/user-watch-time/:userId', 
    
 exports.getWatchTime = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const dailyWatchTime = user.totalWatchTime.daily;
        const weeklyAverage = user.totalWatchTime.weeklyAverage;

        res.status(200).json({
            success: true,
            dailyWatchTime,
            weeklyAverage
        });
    } catch (error) {
        console.error('Error fetching watch time:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


// const Student = require('../models/studentModel');

// Update total time spent on any resource (reading or watching)
exports.updateResourceTime = async (req, res) => {
  try {
    const { userId, timeInMinutes } = req.body;
    
    const student = await User.findById(userId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Find if there's already an entry for today
    let todayRecord = student.totalResourceTime.daily.find(record => record.date.toISOString().split('T')[0] === today);
    
    if (todayRecord) {
      // If entry exists, update the time
      todayRecord.timeInMinutes += timeInMinutes;
    } else {
      // If not, create a new entry
      student.totalResourceTime.daily.push({ date: new Date(), timeInMinutes });
    }

    // Save the updated student document
    await student.save();

    // Return success response
    res.status(200).json({ message: 'Resource time updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCoins = async (req, res) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) {
          return { message: 'Student not found' };
        }
        
        // Calculate weekly reading average
        student.calculateWeeklyReadingAverage();
        
        // Award coins based on reading time
        student.awardCoins();
        
        // Save updated student data
        await student.save();
        
        return { message: 'Coins awarded successfully', coins: student.coins };
      } catch (error) {
        console.error(error);
        return { message: 'Error calculating coins' };
      }
}