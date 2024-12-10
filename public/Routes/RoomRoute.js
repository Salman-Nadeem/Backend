const express = require('express');
const Room = require('../model/RoomModel'); // Room model ko import karein

const router = express.Router();

// POST request to create a new room
router.post('/', async (req, res) => {
  try {
    const { roomNumber, roomType, roomPrice, status, description } = req.body;

    // Room model ka instance banate hain
    const newRoom = new Room({
      roomNumber,
      roomType,
      roomPrice,
      status,
      description,
    });

    // Room ko save karte hain
    await newRoom.save();

    res.status(201).json({ message: 'Room Created Successfully', data: newRoom });
  } catch (error) {
    console.error('Error Creating Room:', error);
    res.status(500).json({ message: 'Error Creating Room', error: error.message });
  }
});

// GET request to fetch all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find(); // All rooms ko fetch karte hain
    res.status(200).json({ message: 'Rooms Fetched Successfully', data: rooms });
  } catch (error) {
    console.error('Error Fetching Rooms:', error);
    res.status(500).json({ message: 'Error Fetching Rooms', error: error.message });
  }
});

// GET request to fetch a single room by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id); // Room ko ID ke basis par fetch karte hain

    if (!room) {
      return res.status(404).json({ message: 'Room Not Found' });
    }

    res.status(200).json({ message: 'Room Fetched Successfully', data: room });
  } catch (error) {
    console.error('Error Fetching Room:', error);
    res.status(500).json({ message: 'Error Fetching Room', error: error.message });
  }
});

module.exports = router;
