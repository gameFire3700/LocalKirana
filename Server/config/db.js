// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/LocalKirana');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Mongo Error:', err.message);
    process.exit(1); // Stop the server if DB fails to connect   
  }
};

module.exports = connectDB;
