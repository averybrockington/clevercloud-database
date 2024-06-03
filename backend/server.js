const express = require('express');
const { Sequelize, DataTypes, Error } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Create a Sequelize instance
const connection = new Sequelize("mysql://u07mcepopweif4ln:7b8cboTnbOj8Dx062nSE@btlqpckfuth52y5zn4ue-mysql.services.clever-cloud.com:3306/btlqpckfuth52y5zn4ue");
connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

// Create an instance of Express
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//////////////////////////////////////////CREATE NEW PROFILE FUNCTION //////////////////////////////////////////////

// Route to handle creating a new profile
app.post('/create-profile', (req, res) => {
    const { newUsername, firstName, lastName, newPassword } = req.body;
    const MAX_LENGTH = 45; // Maximum length for VARCHAR columns

    // Truncate strings if they exceed maximum length
    newUsername = newUsername.substring(0, MAX_LENGTH);
    firstName = firstName.substring(0, MAX_LENGTH);
    lastName = lastName.substring(0, MAX_LENGTH);
    newPassword = newPassword.substring(0, MAX_LENGTH);
  
    // Check if username already exists
    connection.query('SELECT * FROM profiles WHERE username = ?', [newUsername], (error, results) => {
      if (error) {
        console.error('Error querying database: ', error);
        res.status(500).send('1: Error creating profile' + error.message);
        return;
      }
  
      if (results.length > 0) {
        res.status(400).send('Username already exists');
        return;
      }
  
      // Insert new profile into the database
      connection.query(
        'INSERT INTO profiles (Username, First_Name, Last_Name, Password) VALUES (?, ?, ?, ?)',
        [newUsername, firstName, lastName, newPassword],
        (err, result) => {
          if (err) {
            console.error('Error inserting into database: ', err);
            res.status(500).send('Error creating profile: unable to alter database' + err.message);
            return;
          }
          res.status(201).send('Profile created successfully');
        }
      );
    });
  });
  

////////////////////////////////////////LOGIN FUNCTION///////////////////////////////////////

// Route to handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query the database to find the user with the given username and password
    connection.query(
      'SELECT * FROM profiles WHERE username = ? AND password = ?',
      [username, password],
      (error, results) => {
        if (error) {
          console.error('Error querying database: ', error);
          res.status(500).send('Error logging in (backend)');
          return;
        }
  
        // Check if a user with the given username and password exists
        if (results.length === 1) {
          res.status(200).send('Login successful');
        } else {
          res.status(401).send('Invalid username or password');
        }
      }
    );
  });
  
// Start the server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
