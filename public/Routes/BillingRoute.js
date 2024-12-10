const express = require('express');
const router = express.Router();
const Billing = require('../model/BillingModel') // Import Billing model

// POST request to create a new billing record
router.post('/', async (req, res) => {
  try {
    const { reservationId, billingAmount, services, paymentStatus, invoiceId } = req.body;

    // Ensure all required fields are provided
    if (!billingAmount || !services || !paymentStatus) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new billing record
    const newBilling = new Billing({
      reservationId,
      billingAmount,
      services,
      paymentStatus,
      invoiceId,
    });

    // Save the billing record to the database
    const savedBilling = await newBilling.save();

    res.status(201).json({
      message: 'Billing Record Created Successfully',
      data: savedBilling,
    });
  } catch (error) {
    console.error('Error Creating Billing Record:', error);
    res.status(500).json({
      message: 'Error Creating Billing Record',
      error: error.message,
    });
  }
});

// GET request to fetch all billing records
router.get('/', async (req, res) => {
  try {
    const billings = await Billing.find();  // Fetch all billing records
    res.status(200).json({
      message: 'Billing Records Fetched Successfully',
      data: billings,
    });
  } catch (error) {
    console.error('Error Fetching Billing Records:', error);
    res.status(500).json({
      message: 'Error Fetching Billing Records',
      error: error.message,
    });
  }
});

module.exports = router;
