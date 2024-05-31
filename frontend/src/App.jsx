import React from 'react';
import LoginForm from './LoginForm.jsx';
import CreateProfileForm from './CreateProfileForm.jsx';
import './App.css'; // Import any styles for the App component

function App() {
  return (
    <div className="App">
      <LoginForm /> {/* Login form component */}
      <CreateProfileForm /> {/* Profile creation form component */}
    </div>
  );
}

export default App;
