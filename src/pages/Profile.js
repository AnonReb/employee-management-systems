// src/pages/Profile.js
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [contactNumber, setContactNumber] = useState('123-456-7890');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleProfilePictureChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes
    console.log('Changes saved');
  };

  const handleCancel = () => {
    // Implement logic to discard changes
    console.log('Changes discarded');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <div className="profile-picture-container">
          <img
            src={profilePicture || 'default-avatar.png'}
            alt="Profile"
            className="profile-picture"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="profile-picture-input"
          />
        </div>
      </div>
      <div className="profile-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button onClick={handleSaveChanges} className="btn save-btn">
            Save Changes
          </button>
          <button onClick={handleCancel} className="btn cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
