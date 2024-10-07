// src/components/MainLayout.js
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = ({ children, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="MainLayout">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'shifted'}`}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
 
