const mongoose = require('mongoose'); // Assuming Invoice model exists

const BillingSchema = new mongoose.Schema({
  reservationId: {
    type: Number,
  },
  billingAmount: {
    type: Number,  // To store decimal values for billing amounts
    required: true,
  },
  services: {
    type: String,  // List of services provided
    required: true,
  },
  paymentStatus: {
    type: String,  // Can be "Paid", "Pending", "Failed", etc.
    required: true,
  },
  invoiceId: {
    type: Number,
  },
}, {
  timestamps: true,  // Automatically creates createdAt and updatedAt fields
});

const Billing = mongoose.model('Billing', BillingSchema);

module.exports = Billing;
