// models/attendance.js

const mongoose = require('mongoose');

// Define the attendance schema
const attendanceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: String, // You can use Date type if you want to store the actual time
    required: true,
  },
  checkOutTime: {
    type: String, // Date type can also be used here
    default: null, // Default is null until the user checks out
  },
}, { timestamps: true });

// Create and export the Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
 
