import React, { useState, useEffect } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchAttendanceRecords = () => {
      // Fetch attendance data for the current user only
      const records = JSON.parse(localStorage.getItem(`attendanceRecords_${user.email}`)) || [];
      setAttendanceRecords(records);
      setLoading(false);
    };

    fetchAttendanceRecords();
  }, [user.email]);

  const getStatus = (record) => {
    const checkInTime = new Date(`${record.date}T${record.time}`);
    const checkOutTime = record.checkOut ? new Date(`${record.date}T${record.checkOut}`) : null;

    const startTime = new Date(`${record.date}T08:00:00`);
    const endTime = new Date(`${record.date}T16:00:00`);

    let resumptionStatus = 'Absent';
    let closingStatus = 'No check-out recorded';

    if (checkInTime) {
      resumptionStatus = checkInTime > startTime ? 'You were late for work' : 'You resumed early';
    }

    if (checkOutTime) {
      closingStatus = checkOutTime < endTime ? 'You closed too early' : 'You closed appropriately';
    }

    return { resumptionStatus, closingStatus };
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2>Attendance Records</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check-In Time</th>
              <th>Check-Out Time</th>
              <th>Resumption Status</th>
              <th>Closing Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record, index) => {
                const { resumptionStatus, closingStatus } = getStatus(record);
                return (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.time}</td>
                    <td>{record.checkOut || 'N/A'}</td>
                    <td>{resumptionStatus}</td>
                    <td>{closingStatus}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attendance;
