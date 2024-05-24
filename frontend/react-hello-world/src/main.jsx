import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm'; // Ensure you have these components created
import CreateProfileForm from './CreateProfileForm';

const App = () => (
  <div>
    <section className="intro">
      <header>
        <h1>User Profile</h1>
        <p>Log in to view account data</p>
      </header>
    </section>
    <section>
      <header>
        <h2>Sign in to Your Profile</h2>
      </header>
      <div className="content">
        <LoginForm />
      </div>
    </section>
    <section>
      <header>
        <h2>Create a New Profile</h2>
      </header>
      <div className="content">
        <CreateProfileForm />
      </div>
    </section>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
