const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Yeh field lazmi hai
  },
  userpassword: {
    type: String,
    required: true, // Yeh bhi lazmi hai
  },
  userrole: {
    type: String,
    required: true, // User ka role specify hona chahiye
  },
  contactinfo: {
    type: String, // Extra information, zaroori nahi
  },
  status: {
    type: String, // Default value "active"
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically abhi ka waqt daal deta hai
  },
});

// Model create kar rahe hain
const User = mongoose.model('User_For_Eproject', userSchema);

module.exports = User;
