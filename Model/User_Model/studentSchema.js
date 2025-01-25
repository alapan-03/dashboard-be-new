const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  enrolledClassrooms: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Classroom' 
    }
  ],
  assignments: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'StudentAssignment' 
    }
  ],
  timeSpent: [
          {
              userId: {
                  type: mongoose.Schema.ObjectId, 
                  ref: "User", // Reference to User model
                  required: true
              },
              daily: [{
                  date: { type: Date, required: true },
                  timeInMinutes: { type: Number, required: true } // Time spent in minutes
              }],
              weeklyAverage: {
                  type: Number, // Calculated field, weekly average in minutes
                  default: 0
              }
          }
      ],

  totalWatchTime: {
    daily: {
      type: [{ date: { type: Date, required: true }, timeInMinutes: { type: Number, required: true } }],
      default: [],
    },
    weeklyAverage: { type: Number, default: 0 },
  },
  
  coins: { 
    type: Number, 
    default: 0 
  }
});

studentSchema.methods.calculateWeeklyReadingAverage = function () {
  const currentDate = new Date();
  // const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  
  const lastWeekRecords = this.totalWatchTime.daily.filter(record => record.date > oneWeekAgo);
  const totalMinutes = lastWeekRecords.reduce((sum, record) => sum + record.timeInMinutes, 0);
  
  // this.totalReadingTime.weeklyAverage = totalMinutes / 7;
  this.totalWatchTime.weeklyAverage = totalMinutes / 7;

};

studentSchema.methods.awardCoins = function () {
  const coins = Math.floor(this.totalWatchTime.weeklyAverage / 10);  // Award 1 coin per 10 minutes
  this.coins += coins;
};

module.exports = mongoose.model('Student', studentSchema);
