// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Attendance from './pages/Attendance';
import WorkHours from './pages/WorkHours';
import LeaveRequests from './pages/LeaveRequests';
import LoanApplications from './pages/LoanApplications';
import Profile from './pages/Profile'; // Import the Profile component
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Home />
            </MainLayout>
          } 
        />
        <Route 
          path="/attendance" 
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Attendance />
            </MainLayout>
          } 
        />
        <Route 
          path="/workhours" 
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <WorkHours />
            </MainLayout>
          } 
        />
        <Route 
          path="/leaverequests" 
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <LeaveRequests />
            </MainLayout>
          } 
        />
        <Route 
          path="/loanapplications" 
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <LoanApplications />
            </MainLayout>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Profile />
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
