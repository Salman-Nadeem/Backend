const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true, // Room number ko unique hona chahiye
  },
  roomType: {
    type: String,
    required: true,// Only these types are allowed
  },
  roomPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  }
});

// Model create karte hain
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
