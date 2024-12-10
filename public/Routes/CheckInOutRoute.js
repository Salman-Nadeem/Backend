const express = require('express');
const router = express.Router();
const {
  createCheckInOut,
  getAllCheckInOut,
  updateCheckInOut,
  deleteCheckInOut,
} = require('../controller/CheckInOut'); // Assuming the controller file is in the controller folder

// POST request to create a new CheckIn/Out record
router.post('/', createCheckInOut);

// GET request to fetch all CheckIn/Out records
router.get('/', getAllCheckInOut);

// PUT request to update a CheckIn/Out record by ID
router.put('/:id', updateCheckInOut);

// DELETE request to delete a CheckIn/Out record by ID
router.delete('/:id', deleteCheckInOut);

module.exports = router;
