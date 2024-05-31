import React from 'react';
import LoginForm from './components/LoginForm.jsx';
import CreateProfileForm from './components/CreateProfileForm.jsx';
import './App.css'; // Import any styles for the App component

function App() {
  return (
    <div className="App">
      <h1>User Profile</h1>
      <p>Log in to view account data</p>
      <LoginForm /> {/* Login form component */}
      <h2>Create a New Profile</h2>
      <CreateProfileForm /> {/* Profile creation form component */}
    </div>
  );
}

export default App;
