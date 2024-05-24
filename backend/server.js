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

// Define models using Sequelize
const item = sequelize.define('item', {
  
FirstName: {type:DataTypes.STRING},
LastName: {type:DataTypes.STRING},
FullName: {type:DataTypes.INTEGER},
Username:  {type:DataTypes.STRING},
Password:  {type:DataTypes.STRING},
LoginInfo: {type:DataTypes.INTEGER},
UserProfile:{type:DataTypes.INTEGER},
});

// Sync models with the database
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

app.get('/api/items')//Link the user will search (prefix is the clever cloud domain)
    async (req, res) => { //Controller function.
        try {
            // findAll() adds the exclude fields by default
            const allItems = await item.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } });
            console.log('Got the items:', allItems);
            res.json(allItems); // Send fetched items back to the client, display the json
        } catch (error) {
            console.error("Couldn't fetch items:", error);
            res.status(500).json({ error: "Internal server error" }); // Send error response
        }
    };

// Start the server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
