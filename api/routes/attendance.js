const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');

// POST: Log Check-In / Check-Out
router.post('/log', async (req, res) => {
  const { username, type } = req.body;
  const currentTime = new Date();

  try {
    if (type === 'checkin') {
      const newAttendance = new Attendance({
        username,
        checkInTime: currentTime,
        checkOutTime: null,
        date: currentTime,
      });
      await newAttendance.save();
      res.status(201).json({ message: 'Checked in successfully', attendance: newAttendance });
    } else if (type === 'checkout') {
      const attendance = await Attendance.findOne({ username, checkOutTime: null }).sort({ createdAt: -1 });

      if (attendance) {
        attendance.checkOutTime = currentTime;
        await attendance.save();
        res.status(200).json({ message: 'Checked out successfully', attendance });
      } else {
        res.status(404).json({ message: 'No check-in record found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging attendance', error });
  }
});

// GET: Retrieve Attendance Logs for a User
router.get('/logs/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const attendanceLogs = await Attendance.find({ username }).sort({ date: -1 });
    res.status(200).json(attendanceLogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance logs', error });
  }
});

module.exports = router;
