const express = require('express');
const router = express.Router();
const Reservation = require('../model/ReservationModel');  // Reservation model import kar rahe hain

// POST: Create a new reservation
router.post('/' , async(req,res)=>{
    try {
        const { guestId, roomId, checkInDate, checkOutDate, status, staff } = req.body;
    
        const newReservation = new Reservation({
          guestId,
          roomId,
          checkInDate,
          checkOutDate,
          status,
          staff,
        });
    
        await newReservation.save();
    
        res.status(201).json({
          message: 'Reservation Created Successfully',
          data: newReservation,
        });
      } catch (error) {
        console.error('Error Creating Reservation:', error);
        res.status(500).json({
          message: 'Error Creating Reservation',
          error: error.message,
        });
      }
})


// GET: Fetch all reservations
router.get('/' , async(req,res)=>{
  try {
    const reservations = await Reservation.find();  // Populate user and room details
    res.status(200).json({
      message: 'Reservations Fetched Successfully',
      data: reservations,
    });
  } catch (error) {
    console.error('Error Fetching Reservations:', error);
    res.status(500).json({
      message: 'Error Fetching Reservations',
      error: error.message,
    });
  }
})
module.exports = router;

