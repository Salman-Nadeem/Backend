const express = require('express');
const router = express.Router();
const User =  require('../model/Users');

// GET request to fetch all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from database
      res.status(200).json({ message: 'Users Fetched Successfully', data: users });
    } catch (error) {
      res.status(500).json({ message: 'Error Fetching Users', error: error.message });
    }
  });
  
  // POST request to create a new user
  router.post('/', async (req, res) => {
    try {
      const { username, userpassword, userrole, contactinfo, status } = req.body;
  
      // Ensure all required fields are provided
      if (!username || !userpassword || !userrole) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Naya user object banayenge
      const newUser = new User({
        username,
        userpassword,
        userrole,
        contactinfo,
        status,
      });
  
      // User ko database mein save karein
      const savedUser = await newUser.save();
  
      res.status(201).json({
        message: 'User Created Successfully',
        data: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error Creating User',
        error: error.message,
      });
    }
  });
  

  
module.exports = router;
