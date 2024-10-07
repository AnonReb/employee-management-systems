import React, { useState, useEffect } from 'react';
import './LeaveRequests.css';

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [leaveHistory, setLeaveHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const userLeaveHistory = JSON.parse(localStorage.getItem(`leaveHistory_${user.username}`)) || [];
    setLeaveHistory(userLeaveHistory);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      date: new Date().toISOString().split('T')[0],
      type: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: 'Submitted'
    };

    const userLeaveHistory = [...leaveHistory, newLeave];
    localStorage.setItem(`leaveHistory_${user.username}`, JSON.stringify(userLeaveHistory));
    setLeaveHistory(userLeaveHistory);

    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    });

    alert('Leave request submitted successfully!');
  };

  return (
    <div className="leave-request-container">
      <h2>Leave Request</h2>
      <form onSubmit={handleSubmit} className="leave-request-form">
        <div className="form-group">
          <label>Leave Type</label>
          <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
            <option value="">Select type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Paid Leave">Paid Leave</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Reason</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn">Submit Request</button>
      </form>

      <h3>Leave History</h3>
      <table className="leave-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistory.length > 0 ? (
            leaveHistory.map((leave, index) => (
              <tr key={index}>
                <td>{leave.date}</td>
                <td>{leave.type}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No leave history found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequest;
