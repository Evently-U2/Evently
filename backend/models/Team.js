const mongoose = require('mongoose')


const TeamSchema = new mongoose.Schema({

  leaderName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
    required: [true, 'Please provide team leader infomation'],
    trim: true
  },
  teamName: {
    type: String,
    required: [true, 'Please provide team name'],
    trim: true,
    unique: true,
  },
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
  }],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Please provide event info'],
    trim: true
  },
  isFood: {
    type: true,
    default: false,
  },
  isStay: {
    type: true,
    default: false,
  },
  
});



module.exports = mongoose.model('Team', TeamSchema)
