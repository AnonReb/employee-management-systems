// src/pages/WorkingHours.js
import React, { useState, useEffect } from 'react';
import './WorkHours.css';

const WorkHours = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const start = new Date();
      const end = new Date();
      
      // Set start time to 8:00 AM and end time to 4:00 PM
      start.setHours(8, 0, 0, 0); // 8:00 AM
      end.setHours(16, 0, 0, 0); // 4:00 PM

      if (now < start) {
        setTimeLeft('The workday has not started yet.');
      } else if (now >= end) {
        setTimeLeft('The workday has ended.');
      } else {
        const difference = end - now;
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="working-hours-container">
      <h2>Working Hours Countdown</h2>
      <div className="countdown-timer">{timeLeft}</div>
    </div>
  );
};

export default WorkHours;
