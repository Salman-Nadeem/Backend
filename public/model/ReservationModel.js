const mongoose = require('mongoose');
  // Room model ko import kar rahe hain

const ReservationSchema = new mongoose.Schema({
  guestId: {
    type: Number,// Guest ko User model se refer kar rahe hain
    required: true,  // Guest ID hona zaroori hai
  },
  roomId: {
    type: Number, // Room ko Room model se refer kar rahe hain
    required: true,  // Room ID hona zaroori hai
  },
  checkInDate: {
    type: Date,
    required: true,  // Check-in date hona zaroori hai
  },
  checkOutDate: {
    type: Date,
    required: true,  // Check-out date hona zaroori hai
  },
  status: {
    type: String,
  },
  staff: {
    type: Number ,
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Record creation date default current date hoga
  },
});

// Model banate hain
const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;
