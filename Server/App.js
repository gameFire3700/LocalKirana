const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

connectDB();



mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB:', mongoose.connection.db.databaseName);
  console.log('Mongoose readyState:', mongoose.connection.readyState); // 1 means connected
});


// ✅ Routes import
const productRoutes = require('./router/productRoutes');
const aboutRoutes = require('./router/aboutRoutes');
const featureRoutes = require('./router/featureRoutes');
const categoryRoutes = require('./router/categoryRoutes');
const contactRoutes = require('./router/contactRoutes');
const retailerRoutes = require('./router/retailerRoutes');
const customerRoutes = require('./router/customerRoutes');
const authRoutes = require('./router/authRoutes');


const errorHandler = require('./middleware/errorHandler');

// ✅ Base Route
app.get('/', (req, res) => res.json({ name: "Local Kirana" }));

// ✅ Mount routes
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/aboutus', aboutRoutes);
app.use('/features', featureRoutes);
app.use('/contactus', contactRoutes);
app.use('/retailer', retailerRoutes);
app.use('/customer', customerRoutes);
app.use('/auth', authRoutes);

// ✅ 404 handler
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
