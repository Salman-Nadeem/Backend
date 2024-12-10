const CheckInOut = require('../model/CheckInOut');
const Reservation = require('../model/ReservationModel');
const Billing = require('../model/BillingModel');

// Create CheckIn/Out record
const createCheckInOut = async (req, res) => {
    try {
      const { reservationId, checkInTime, checkOutTime, keyIssued, billingId } = req.body;
  
      // Ensure required fields are provided
      if (!reservationId || !checkInTime || !checkOutTime || !keyIssued || !billingId) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Ensure CheckInTime and CheckOutTime are in correct Date format
      const checkInDate = new Date(checkInTime);
      const checkOutDate = new Date(checkOutTime);
  
      if (isNaN(checkInDate) || isNaN(checkOutDate)) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
  
      // Create new CheckInOut record
      const newCheckInOut = new CheckInOut({
        reservationId,
        CheckInTime: checkInDate,
        CheckOutTime: checkOutDate,
        Keyissued: keyIssued,
        billingid: billingId,
      });
  
      await newCheckInOut.save();
  
      res.status(201).json({
        message: 'CheckIn/Out Record Created Successfully',
        data: newCheckInOut,
      });
    } catch (error) {
      console.error('Error Creating CheckIn/Out:', error);
      res.status(500).json({
        message: 'Error Creating CheckIn/Out',
        error: error.message,
      });
    }
  };
  
  
// Get all CheckIn/Out records
const getAllCheckInOut = async (req, res) => {
  try {
    const checkInOutRecords = await CheckInOut.find()
      .populate('reservationId' , 'status')  // Populate reservation details
      .populate('billingid' , 'billingAmount');     // Populate billing details
    
    res.status(200).json({
      message: 'CheckIn/Out Records Fetched Successfully',
      data: checkInOutRecords,
    });
  } catch (error) {
    console.error('Error Fetching CheckIn/Out Records:', error);
    res.status(500).json({
      message: 'Error Fetching CheckIn/Out Records',
      error: error.message,
    });
  }
};

// Update CheckIn/Out record
const updateCheckInOut = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkInTime, checkOutTime, keyIssued, billingId } = req.body;

    const updatedCheckInOut = await CheckInOut.findByIdAndUpdate(id, {
      checkInTime,
      checkOutTime,
      keyIssued,
      billingId,
    }, { new: true });

    if (!updatedCheckInOut) {
      return res.status(404).json({ message: 'CheckIn/Out record not found' });
    }

    res.status(200).json({
      message: 'CheckIn/Out Record Updated Successfully',
      data: updatedCheckInOut,
    });
  } catch (error) {
    console.error('Error Updating CheckIn/Out:', error);
    res.status(500).json({
      message: 'Error Updating CheckIn/Out',
      error: error.message,
    });
  }
};

// Delete CheckIn/Out record
const deleteCheckInOut = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCheckInOut = await CheckInOut.findByIdAndDelete(id);

    if (!deletedCheckInOut) {
      return res.status(404).json({ message: 'CheckIn/Out record not found' });
    }

    res.status(200).json({
      message: 'CheckIn/Out Record Deleted Successfully',
    });
  } catch (error) {
    console.error('Error Deleting CheckIn/Out:', error);
    res.status(500).json({
      message: 'Error Deleting CheckIn/Out',
      error: error.message,
    });
  }
};

// Exporting all functions for use in routes
module.exports = {
  createCheckInOut,
  getAllCheckInOut,
  updateCheckInOut,
  deleteCheckInOut,
};
