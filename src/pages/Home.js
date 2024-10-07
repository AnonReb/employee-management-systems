import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  useEffect(() => {
    const checkIfCheckedIn = () => {
      const today = new Date().toISOString().split('T')[0];
      const checkInRecord = JSON.parse(localStorage.getItem(`checkInRecord_${user.email}`)) || {};
      if (checkInRecord.date === today) {
        setIsCheckedIn(true);
      }
    };
    checkIfCheckedIn();
  }, [user]);

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`checkInRecord_${user.email}`, JSON.stringify({ date: today, time: now }));
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const checkInRecord = JSON.parse(localStorage.getItem(`checkInRecord_${user.email}`)) || {};
    if (checkInRecord.date === new Date().toISOString().split('T')[0]) {
      const attendanceRecords = JSON.parse(localStorage.getItem(`attendanceRecords_${user.email}`)) || [];
      attendanceRecords.push({ ...checkInRecord, checkOut: now });
      localStorage.setItem(`attendanceRecords_${user.email}`, JSON.stringify(attendanceRecords));
      localStorage.removeItem(`checkInRecord_${user.email}`);
      setIsCheckedIn(false);
    }
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome back, {user.username || 'User'}!</h1>
        <p>Your personalized dashboard to stay updated.</p>
      </header>

      <section className="profile-section">
        <div className="profile-avatar">
          <img src="https://via.placeholder.com/100" alt="User Avatar" />
        </div>
        <div className="profile-info">
          <h2>{user.id || 'User'}</h2>
          <p>{user.email || 'user@example.com'}</p>
          <Link to="/profile" className="btn">Edit Profile</Link>
        </div>
      </section>

      <section className="actions-section">
        <button
          onClick={handleCheckIn}
          className="btn check-in-btn"
          disabled={isCheckedIn}
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          className="btn check-out-btn"
          disabled={!isCheckedIn}
        >
          Check Out
        </button>
      </section>

      <section className="widgets-section">
        <div className="widget">
          <h3>Upcoming Events</h3>
          <div className="widget-content">
            <p>No upcoming events.</p>
          </div>
        </div>
        <div className="widget">
          <h3>Recent Notifications</h3>
          <div className="widget-content">
            <p>No new notifications.</p>
          </div>
        </div>
        <div className="widget">
          <h3>Work Hours Summary</h3>
          <div className="widget-content">
            <p>Total hours worked this week: 0</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat">
          <h3>Project Progress</h3>
          <p>75%</p>
        </div>
        <div className="stat">
          <h3>Tasks Completed</h3>
          <p>120</p>
        </div>
        <div className="stat">
          <h3>Active Projects</h3>
          <p>5</p>
        </div>
      </section>

      <section className="announcements-section">
        <h3>Featured Announcements</h3>
        <div className="announcement">
          <p>Company meeting on Monday at 10 AM in the main hall.</p>
        </div>
      </section>

      <section className="chart-section">
        <h3>Weekly Overview</h3>
        <div className="chart-placeholder">
          <p>Chart would go here.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
