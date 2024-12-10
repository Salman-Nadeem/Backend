const AuditLog = require('../model/AuditlogModel');
const User = require('../model/Users');

// Create a new Audit Log
const createAuditLog = async (req, res) => {
  try {
    const { action, actorid, affectedentity, details } = req.body;

    // Validation: Check for required fields
    if (!action || !actorid || !affectedentity || !details) {
      return res.status(400).json({ message: 'Missing Required Fields' });
    }

    const newLog = new AuditLog({ action, actorid, affectedentity, details });
    const savedLog = await newLog.save();

    res.status(201).json({ message: 'Audit Log Created Successfully', data: savedLog });
  } catch (error) {
    console.error('Error Creating Audit Log:', error);
    res.status(500).json({ message: 'Error Creating Audit Log', error: error.message });
  }
};

// Fetch all Audit Logs
const fetchAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('actorid', 'username');
    res.status(200).json({ message: 'Audit Logs Fetched Successfully', data: logs });
  } catch (error) {
    console.error('Error Fetching Audit Logs:', error);
    res.status(500).json({ message: 'Error Fetching Audit Logs', error: error.message });
  }
};

// Fetch Audit Log by ID
const fetchAuditLogsById = async (req, res) => {
  try {
    const { id } = req.params;

    const log = await AuditLog.findById(id).populate('actorid', 'username');
    if (!log) {
      return res.status(404).json({ message: 'Audit Log Not Found' });
    }

    res.status(200).json({ message: 'Audit Log Fetched Successfully', data: log });
  } catch (error) {
    console.error('Error Fetching Audit Log by ID:', error);
    res.status(500).json({ message: 'Error Fetching Audit Log by ID', error: error.message });
  }
};

// Update an Audit Log
const updateAuditLog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedLog = await AuditLog.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedLog) {
      return res.status(404).json({ message: 'Audit Log Not Found' });
    }

    res.status(200).json({ message: 'Audit Log Updated Successfully', data: updatedLog });
  } catch (error) {
    console.error('Error Updating Audit Log:', error);
    res.status(500).json({ message: 'Error Updating Audit Log', error: error.message });
  }
};

// Delete an Audit Log
const deleteAuditLog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLog = await AuditLog.findByIdAndDelete(id);
    if (!deletedLog) {
      return res.status(404).json({ message: 'Audit Log Not Found' });
    }

    res.status(200).json({ message: 'Audit Log Deleted Successfully', data: deletedLog });
  } catch (error) {
    console.error('Error Deleting Audit Log:', error);
    res.status(500).json({ message: 'Error Deleting Audit Log', error: error.message });
  }
};

// Exporting the functions
module.exports = {
  createAuditLog,
  fetchAuditLogs,
  fetchAuditLogsById,
  updateAuditLog,
  deleteAuditLog,
};