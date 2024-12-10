const mongoose = require('mongoose');
const User = require('../model/Users');
const Room = require('../model/RoomModel');

// Maintenance schema
const maintenanceSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Room, // Foreign key to Room model
    required: true,
  },
  reportedGuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, // Foreign key to User model
    required: true,
  },
  description: {
    type: String,
    required: true, // Maintenance issue ki description
  },
  status: {
    type: String,

  },
  resolutionDate: {
    type: Date, // Jab issue resolve ho
  },
}, { timestamps: true }); // Timestamps will automatically track created and updated dates

// Model creation
const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
