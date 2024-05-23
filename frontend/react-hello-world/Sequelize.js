// Create a new Sequelize instance
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'myusername',
    password: 'mypassword',
    database: 'mydatabase',
  });
  
  // Test the database connection
  async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection to MySQL database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  // Call the function to test the database connection
  testConnection();