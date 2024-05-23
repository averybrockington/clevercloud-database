const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Load environment variables from .env file
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

// Define your models using Sequelize
const User = sequelize.define('User', {
  // Model attributes
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options
});

// Sync your models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

// Create an instance of Express
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes...
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
