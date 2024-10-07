const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance'); // Import attendance routes

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Enable CORS
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

// No need for app.listen() in Vercel's serverless environment
module.exports = app;
