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
  totalWatchTime: {
    daily: [
      { 
        date: { 
          type: Date, required: true 
        }, 
        timeInMinutes: { 
          type: Number, required: true 
        } 
      }
    ],
    weeklyAverage: { 
      type: Number, 
      default: 0 
    }
  },
  coins: { 
    type: Number, 
    default: 0 
  }
});

studentSchema.methods.calculateWeeklyReadingAverage = function () {
  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
  
  const lastWeekRecords = this.totalWatchTime.daily.filter(record => record.date > oneWeekAgo);
  const totalMinutes = lastWeekRecords.reduce((sum, record) => sum + record.timeInMinutes, 0);
  
  this.totalReadingTime.weeklyAverage = totalMinutes / 7;
};

studentSchema.methods.awardCoins = function () {
  const coins = Math.floor(this.totalWatchTime.weeklyAverage / 10);  // Award 1 coin per 10 minutes
  this.coins += coins;
};

module.exports = mongoose.model('Student', studentSchema);
