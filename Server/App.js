const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

//handle cors policy
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET","POST","DELETE", "PUT" ,"PATCH","HEAD"],
  credentials: true 
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
connectDB();

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB:', mongoose.connection.db.databaseName);
  console.log('Mongoose readyState:', mongoose.connection.readyState); // 1 means connected
});

// ✅ Routes import
const productRoutes = require('./router/productRoutes');
const aboutRoutes = require('./router/aboutRoutes');
const featureRoutes = require('./router/featureRoutes');

const contactRoutes = require('./router/contactRoutes');

const customerRoutes = require('./router/customerRoutes');
const retailerRoutes = require("./router/retailerRoutes");
const adminAuthRoutes = require("./router/adminRoutes");
const authRoutes = require('./router/authUserRoutes');
const categoryRoutes = require("./router/categoryRoutes");


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
app.use("/category", categoryRoutes);
app.use('/auth', authRoutes);
app.use("/admin", adminAuthRoutes);
app.use("/images", express.static("images"));


app.use("/uploads", express.static("uploads"));

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


