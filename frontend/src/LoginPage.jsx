import React from 'react';
import LoginForm from './LoginForm.jsx';
import CreateProfileForm from './CreateProfileForm.jsx';
import './App.css'; // Import any styles for the App component
//ZB
function LoginPage() {
  return (
    <div className="login-page">
      <h1>User Information</h1>
      <LoginForm /> {/* Login form component */}
      <CreateProfileForm /> {/* Profile creation form component */}
    </div>
  );
}

export default LoginPage;