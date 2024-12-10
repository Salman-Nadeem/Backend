const mongoose = require('mongoose');
const User =require('./Users');
const Room = require('./RoomModel')

const HouseKeepingSchema = new mongoose.Schema({
  roomid: {
    type: mongoose.Schema.Types.ObjectId,
    ref : Room ,
    required: true, // Room number ko unique hona chahiye
  },
  assignedStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref : User ,
    required: true,
  },
  status: {
    type: String,
  },
  taskDate: {
    type: Date
  }
});

// Model create karte hain
const HouseKeeping = mongoose.model('HouseKeeping', HouseKeepingSchema);

module.exports = HouseKeeping;
