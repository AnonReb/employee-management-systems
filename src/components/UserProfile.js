// src/components/UserProfile.js
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ name }) => {
  return (
    <div className="user-profile">
      <h2>Welcome, {name}!</h2>
      <p>Let's have a productive day!</p>
    </div>
  );
};

export default UserProfile;
 
