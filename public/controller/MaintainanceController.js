const Maintenance = require('../model/MaintenanceModel'); // Maintenance model import
const Room = require('../model/RoomModel'); // Room model import
const User = require('../model/Users'); // User model import

// Create a new maintenance record
const createMaintenance = async (req, res) => {
  try {
    const { roomId, reportedGuest, description, status, resolutionDate } = req.body;

    // Create maintenance record
    const newMaintenance = new Maintenance({
      roomId,
      reportedGuest,
      description,
      status,
      resolutionDate,
    });

    await newMaintenance.save();

    res.status(201).json({ message: 'Maintenance Record Created Successfully', data: newMaintenance });
  } catch (error) {
    console.error('Error Creating Maintenance Record:', error);
    res.status(500).json({ message: 'Error Creating Maintenance Record', error: error.message });
  }
};

// Get all maintenance records
const getAllMaintenance = async (req, res) => {
    try {
      const maintenanceRecords = await Maintenance.find()
        .populate('roomId', 'roomType')  // Populating only 'roomNumber' and 'roomType' from the 'Room' model
        .populate('reportedGuest', 'username');  // Populating only 'name' and 'email' from the 'User' model
  
      res.status(200).json({
        message: 'Maintenance Records Fetched Successfully',
        data: maintenanceRecords
      });
    } catch (error) {
      console.error('Error Fetching Maintenance Records:', error);
      res.status(500).json({
        message: 'Error Fetching Maintenance Records',
        error: error.message
      });
    }
  };
  
// Get a maintenance record by ID
const getMaintenanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenance = await Maintenance.findById(id).populate('roomId reportedGuest');

    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance Record Not Found' });
    }

    res.status(200).json({ message: 'Maintenance Record Fetched Successfully', data: maintenance });
  } catch (error) {
    console.error('Error Fetching Maintenance Record:', error);
    res.status(500).json({ message: 'Error Fetching Maintenance Record', error: error.message });
  }
};

// Update a maintenance record by ID
const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedMaintenance = await Maintenance.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMaintenance) {
      return res.status(404).json({ message: 'Maintenance Record Not Found' });
    }

    res.status(200).json({ message: 'Maintenance Record Updated Successfully', data: updatedMaintenance });
  } catch (error) {
    console.error('Error Updating Maintenance Record:', error);
    res.status(500).json({ message: 'Error Updating Maintenance Record', error: error.message });
  }
};

// Delete a maintenance record by ID
const deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMaintenance = await Maintenance.findByIdAndDelete(id);

    if (!deletedMaintenance) {
      return res.status(404).json({ message: 'Maintenance Record Not Found' });
    }

    res.status(200).json({ message: 'Maintenance Record Deleted Successfully' });
  } catch (error) {
    console.error('Error Deleting Maintenance Record:', error);
    res.status(500).json({ message: 'Error Deleting Maintenance Record', error: error.message });
  }
};

module.exports = {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
};
