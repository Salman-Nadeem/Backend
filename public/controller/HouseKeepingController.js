const HouseKeeping = require('../model/HouseKeepingModel');
const Room = require('../model/RoomModel');
const User = require('../model/Users');

// Create Housekeeping Record
const createHousekeeping = async (req, res) => {
  try {
    const { roomid, assignedStaff, status, taskDate } = req.body;

    const newHousekeeping = new HouseKeeping({
      roomid,
      assignedStaff,
      status,
      taskDate,
    });

    await newHousekeeping.save();

    res.status(201).json({ message: 'Housekeeping Task Created', data: newHousekeeping });
  } catch (error) {
    console.error('Error Creating Housekeeping Task:', error);
    res.status(500).json({ message: 'Error Creating Housekeeping Task', error: error.message });
  }
};

// Get All Housekeeping Records
const getAllHousekeeping = async (req, res) => {
  try {
    const housekeepingRecords = await HouseKeeping.find()
      .populate('roomid', 'roomType')  // Populating room fields
      .populate('assignedStaff', 'username');  // Populating user fields

    res.status(200).json({
      message: 'Housekeeping Records Fetched Successfully',
      data: housekeepingRecords,
    });
  } catch (error) {
    console.error('Error Fetching Housekeeping Records:', error);
    res.status(500).json({
      message: 'Error Fetching Housekeeping Records',
      error: error.message,
    });
  }
};

// Get Housekeeping by ID
const getHousekeepingById = async (req, res) => {
  try {
    const { id } = req.params;
    const housekeepingRecord = await HouseKeeping.findById(id)
      .populate('roomid', 'roomNumber roomType')  // Populating room fields
      .populate('assignedStaff', 'name email');  // Populating user fields

    if (!housekeepingRecord) {
      return res.status(404).json({ message: 'Housekeeping Record Not Found' });
    }

    res.status(200).json({
      message: 'Housekeeping Record Fetched Successfully',
      data: housekeepingRecord,
    });
  } catch (error) {
    console.error('Error Fetching Housekeeping Record:', error);
    res.status(500).json({
      message: 'Error Fetching Housekeeping Record',
      error: error.message,
    });
  }
};

// Update Housekeeping Record
const updateHousekeeping = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedRecord = await HouseKeeping.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Housekeeping Record Not Found' });
    }

    res.status(200).json({ message: 'Housekeeping Record Updated', data: updatedRecord });
  } catch (error) {
    console.error('Error Updating Housekeeping Record:', error);
    res.status(500).json({
      message: 'Error Updating Housekeeping Record',
      error: error.message,
    });
  }
};

// Delete Housekeeping Record
const deleteHousekeeping = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await HouseKeeping.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Housekeeping Record Not Found' });
    }

    res.status(200).json({ message: 'Housekeeping Record Deleted Successfully' });
  } catch (error) {
    console.error('Error Deleting Housekeeping Record:', error);
    res.status(500).json({
      message: 'Error Deleting Housekeeping Record',
      error: error.message,
    });
  }
};

module.exports = {
  createHousekeeping,
  getAllHousekeeping,
  getHousekeepingById,
  updateHousekeeping,
  deleteHousekeeping,
};
