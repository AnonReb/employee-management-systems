// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaClock, FaMoneyCheck, FaEnvelopeOpenText, FaChartLine } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? '☰' : '☰'}
      </button>
      <nav className="sidebar-nav">
        <NavLink to="/" exact className="sidebar-item">
          <FaHome className="icon" />
          <span className="text">Home</span>
        </NavLink>
        <NavLink to="/profile" className="sidebar-item">
          <FaUser className="icon" />
          <span className="text">Profile</span>
        </NavLink>
        <NavLink to="/attendance" className="sidebar-item">
          <FaClock className="icon" />
          <span className="text">Attendance</span>
        </NavLink>
        <NavLink to="/workhours" className="sidebar-item">
          <FaChartLine className="icon" />
          <span className="text">Work Hours</span>
        </NavLink>
        <NavLink to="/loanapplications" className="sidebar-item">
          <FaMoneyCheck className="icon" />
          <span className="text">Loans</span>
        </NavLink>
        <NavLink to="/leaverequests" className="sidebar-item">
          <FaEnvelopeOpenText className="icon" />
          <span className="text">Leave Requests</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
