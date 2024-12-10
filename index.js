const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.set('views', path.join(__dirname, 'public', 'views'));
app.use(cors());

// Use express.json() instead of body-parser
app.use(express.json()); // JSON data ko parse karna
app.use(express.urlencoded({ extended: true })); // URL-encoded data ko parse karna

// Import DB connection and routes
const { DbConnection } = require('./public/Config/Db');
const auditlogRoute = require('./public/Routes/AuditlogRoute');
const MaintananceRoute = require('./public/Routes/MaintananceRoute');
const Housekeeping = require('./public/Routes/HousekeepingRoute');
const CheckInOut = require('./public/Routes/CheckInOutRoute');
const ReservationRoute = require('./public/Routes/ReservationRoute');
const Billing = require('./public/Routes/BillingRoute');
const User = require('./public/Routes/UserRoute');
const Room = require('./public/Routes/RoomRoute')

DbConnection();

// Use routes for API endpoints
app.use('/audit/', auditlogRoute);
app.use('/user/', User);
app.use('/room/', Room);
app.use('/maintanance/', MaintananceRoute);
app.use('/HouseKeeping/', Housekeeping);
app.use('/Reservation/', ReservationRoute);
app.use('/bill/', Billing);
app.use('/CheckInOut/', CheckInOut);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
