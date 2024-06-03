import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
//ZB

// This peice is used to create a new profile from each new user.
const CreateProfileForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // This part of the code is to check the input before the 
  // information is put in the server.
  const handleProfileCreation = async (event) => {
    event.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // This part gathers the information and creats a profile with the input data
    // which then is stored in the server.
    try {
      const response = await fetch('http://localhost:3306/create-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername, firstName, lastName, newPassword }),
      });

      const data = await response.json();

      // this part is check the respoce of the server from the new profiles.
      if (response.ok && data.success) {
        alert('Profile created successfully!');
        //optionally redirect to another page
        navigate('/dashboard');
      } else {
        setError(data.message || 'Error creating profile (frontend 1)');
      }
    } catch (error) {
      setError('Error creating profile (frontend 2)');
      //navigate('/dashboard');
    }
  };

  // for the rest of the code is to make the inputs into forms for the 
  // new profiles.
  return (
    <div className="create-profile-form">
      <h2>Create New Profile</h2>
      <h4>Enter the following information to create a new profile</h4>
      <form onSubmit={handleProfileCreation}>
      <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newUsername">Username:</label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPssword">Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword"> Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfileForm;
