const mongoose = require('mongoose');
const User = require('./Users')
const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true, // Action specify karna zaroori hai
  },
  actorid: {
    type: mongoose.Schema.Types.ObjectId, // Foreign key reference to User
    ref: User, // Refers to the 'User' model
    required: true, // Actor ID ka hona zaroori hai
  },
  timestamp: {
    type: Date,
    default: Date.now, // Default abhi ka waqt
  },
  affectedentity: {
    type: String,
    required: true, // Jis entity ko effect kiya hai wo zaroori hai
  },
  details: {
    type: String, // Additional details
  },
});

// Model create karte hain
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
