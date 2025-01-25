const mongoose = require("mongoose");

const resourceVideoSchema = mongoose.Schema({
  name: String,
  subjectId: mongoose.Schema.ObjectId,
  topicId: mongoose.Schema.ObjectId,
  videoUrl: { type: String, required: true },
  timeSpent: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
      daily: [{
        date: { type: Date, required: true },
        timeInMinutes: { type: Number, required: true }
      }],
      weeklyAverage: {
        type: Number,
        default: 0
      }
    }
  ]
});

// Helper function to calculate weekly average
// resourceVideoSchema.methods.calculateWeeklyAverage = function (userId) {
//   const currentDate = new Date();
//   const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
  
//   const userTimeSpent = this.timeSpent.find((record) => record.userId.equals(userId));
//   if (userTimeSpent) {
//     const lastWeekRecords = userTimeSpent.daily.filter(record => record.date > oneWeekAgo);
//     const totalMinutes = lastWeekRecords.reduce((sum, record) => sum + record.timeInMinutes, 0);
//     userTimeSpent.weeklyAverage = totalMinutes / 7;
//   }
// };

// // Middleware to automatically update the weekly average when `timeSpent` is modified
// resourceVideoSchema.pre('save', function (next) {
//   this.timeSpent.forEach(userRecord => {
//     this.calculateWeeklyAverage(userRecord.userId);
//   });
//   next();
// });

const resourceVideoModel = mongoose.model("Video Resource", resourceVideoSchema);

module.exports = resourceVideoModel;
