import React from 'react';
import LoginForm from './components/LoginForm';
import CreateProfileForm from './components/CreateProfileForm';
import './App.css';

function App() {
  return (
< HEAD> </HEAD>
    <div className="App">
      <h1>User Profile</h1>
      <p>Log in to view account data</p>
      <LoginForm />
      <h2>Create a New Profile</h2>
      <CreateProfileForm />
    </div>
  );

    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p> Hello World </p>
    </>
  )
>>>>>>> 0f7269d01e7e7312eb277c872aad4db23c5f77cb
}

export default App;
