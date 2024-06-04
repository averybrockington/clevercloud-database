const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const { INTEGER } = require('sequelize/lib/data-types');
require('dotenv').config();
 
// Create a Sequelize instance
const sequelize = new Sequelize("mysql://u07mcepopweif4ln:7b8cboTnbOj8Dx062nSE@btlqpckfuth52y5zn4ue-mysql.services.clever-cloud.com:3306/btlqpckfuth52y5zn4ue");
 
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
 
// Define Profile model
const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    allowNull:false,
    unique: true, 
    primaryKey: true,
    autoIncrement: true
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  firstName: {
      type: DataTypes.STRING,
      allowNull: false
  },
  lastName: {
      type: DataTypes.STRING,
      allowNull: false
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  }
}, {
  tableName: 'profiles',
  timestamps: false
});
 
 
 
// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Profiles table has been synced.');
    })
    .catch(error => {
        console.error('Unable to sync the profiles table:', error);
    });
 
// Create an instance of Express
const app = express();
 
// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
 
// Route to handle creating a new profile
app.post('/create-profile', async (req, res) => {
    const { newUsername, firstName, lastName, newPassword } = req.body;
    const MAX_LENGTH = 45;
 
    try {
        // Truncate strings if they exceed maximum length
        const truncatedUsername = newUsername.substring(0, MAX_LENGTH);
        const truncatedFirstName = firstName.substring(0, MAX_LENGTH);
        const truncatedLastName = lastName.substring(0, MAX_LENGTH);
        const truncatedPassword = newPassword.substring(0, MAX_LENGTH);
 
        // Check if username already exists
        const existingProfile = await Profile.findOne({ where: { username: truncatedUsername } });
        if (existingProfile) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }
 
        // Create new profile
        await Profile.create({
            username: truncatedUsername,
            firstName: truncatedFirstName,
            lastName: truncatedLastName,
            password: truncatedPassword
        });
 
        res.status(201).json({ success: true, message: 'Profile created successfully!' });
    } catch (error) {
        console.error('Error creating profile(backend 1):', error);
        res.status(500).json({ success: false, message: 'Error creating profile (backend 1.1)' });
    }
});
 
// Route to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
 
    try {
        // Query the database to find the user with the given username and password
        const profile = await Profile.findOne({ where: { username, password } });
 
        if (profile) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Invalid username or password' });
    }
});
 
// Start the server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 