const mongoose = require('mongoose'); 
const Reservation = require('./ReservationModel');
const Billing = require('./BillingModel');

const CheckInOutSchema = new mongoose.Schema({
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : Reservation,
    required : true
  },
  CheckInTime: {
    type: Date,  // Store Date values for check-in
    required: true,
  },
  CheckOutTime: {
    type: Date,  // Store Date values for check-out
    required: true,
  },
  Keyissued: {
    type: String,  // Can be "Yes", "No", etc.
    required: true,
  },
  billingid: {
    type: mongoose.Schema.Types.ObjectId,
    ref : Billing, 
  }
}, {
  timestamps: true,  // Automatically creates createdAt and updatedAt fields
});

const CheckInOut = mongoose.model('CheckInOut', CheckInOutSchema);

module.exports = CheckInOut;
