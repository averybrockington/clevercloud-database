import React, { useState } from 'react';

// This peice is used to create a new profile from each new user.
const CreateProfileForm = () => {
  const [newUsername, setNewUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // This part of the code is to check the input before the 
  // information is put in the server.
  const handleSubmit = async (event) => {
    event.preventDefault();
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
        body: JSON.stringify({
          newUsername,
          firstName,
          lastName,
          newPassword,
        }),
      });
      // this part is check the respoce of the server from the new profiles.
      if (response.ok) {
        const data = await response.text();
        alert(data);
      } else {
        alert('Error creating profile');
      }
    } catch (error) {
      alert('Error creating profile');
    }
  };

  // for the rest of the code is to make the inputs into forms for the 
  // new profiles.
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
      </div>
      <div>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
      </div>
      <div>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      </div>
      <button type="submit">Create Profile</button>
    </form>
  );
};

export default CreateProfileForm;
