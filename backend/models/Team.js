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
    type: Boolean,
    default: false,
  },
  isStay: {
    type: Boolean,
    default: false,
  },
  
},
  { timestamps: true }
);



module.exports = mongoose.model('Team', TeamSchema)
