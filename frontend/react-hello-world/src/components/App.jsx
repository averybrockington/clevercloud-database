import React from 'react';
import LoginForm from './components/LoginForm';
import CreateProfileForm from './components/CreateProfileForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>User Profile</h1>
      <p>Log in to view account data</p>
      <LoginForm />
      <h2>Create a New Profile</h2>
      <CreateProfileForm />
    </div>
  );
}

export default App;
