const express = require('express');
const { 
  createHousekeeping, 
  getAllHousekeeping, 
  getHousekeepingById, 
  updateHousekeeping, 
  deleteHousekeeping 
} = require('../controller/HouseKeepingController');  // Importing controller functions

const router = express.Router();

// Create a new housekeeping task
router.post('/', createHousekeeping);

// Get all housekeeping records
router.get('/', getAllHousekeeping);

// Get a specific housekeeping record by ID
router.get('/:id', getHousekeepingById);

// Update a housekeeping record by ID
router.put('/:id', updateHousekeeping);

// Delete a housekeeping record by ID
router.delete('/:id', deleteHousekeeping);

module.exports = router;
