const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://admin:1223@cluster0.zbdf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const droneFlightRoutes = require('./routes/droneFlightRoutes');
const droneOperatorRoutes = require('./routes/droneOperatorRoutes');
const droneRentalRoutes = require('./routes/droneRentalRoutes');
const droneRoutes = require('./routes/droneRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const guideAssignmentRoutes = require('./routes/guideAssignmentRoutes');
const guideRoutes = require('./routes/guideRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const naturalConditionRoutes = require('./routes/naturalConditionRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const routeRoutes = require('./routes/routeRoutes');
const safetyMeasureRoutes = require('./routes/safetyMeasureRoutes');
const touristRoutes = require('./routes/touristRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/drone-flights', droneFlightRoutes);
app.use('/api/drone-operators', droneOperatorRoutes);
app.use('/api/drone-rental', droneRentalRoutes);
app.use('/api/drones', droneRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/guide-assignments', guideAssignmentRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/natural-conditions', naturalConditionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/safety-measures', safetyMeasureRoutes);
app.use('/api/tourists', touristRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;