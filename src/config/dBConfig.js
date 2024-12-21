const mongoose = require('mongoose');
const config = require('./config');

const dbURI = `${config.db.url}`;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(dbURI, {
      autoIndex: false,
    });
    console.log(`Mongoose connected to ${db.connection.host}`);
  } catch (err) {
    console.error(`Mongoose connection error: ${err.message}`);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during disconnection:', err);
    process.exit(1);
  }
});

exports.connectDB = connectDB;
