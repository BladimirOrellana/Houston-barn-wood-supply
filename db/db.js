const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Use appropriate connection string based on environment
    const mongoURI = process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI_PROD // Production URI
      : process.env.MONGO_URI_LOCAL; // Local URI

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected to ${process.env.NODE_ENV} database...`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
