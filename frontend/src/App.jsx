import React from 'react';
import LoginForm from './LoginForm.jsx';
import CreateProfileForm from './CreateProfileForm.jsx';
import './App.css'; // Import any styles for the App component
//ZB
function App() {
  return (
    <div className="App">
      <title>User Information</title>
      <LoginForm /> {/* Login form component */}
      <CreateProfileForm /> {/* Profile creation form component */}
    </div>
  );
}

export default App;
