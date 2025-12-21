const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

/* ========================
   CORS
======================== */

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "HEAD"],
  credentials: true
};
app.use(cors(corsOptions));

/* ========================
   MIDDLEWARES
======================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ important for formdata
app.use(cookieParser());

/* ========================
   DB
======================== */
connectDB();

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected:", mongoose.connection.db.databaseName);
});

/* ========================
   STATIC FILES (🔥 IMAGE FIX)
======================== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "images")));

/* ========================
   ROUTES
======================== */
const productRoutes = require("./router/productRoutes");
const aboutRoutes = require("./router/aboutRoutes");
const featureRoutes = require("./router/featureRoutes");
const contactRoutes = require("./router/contactRoutes");
const customerRoutes = require("./router/customerRoutes");
const retailerRoutes = require("./router/retailerRoutes");
const adminAuthRoutes = require("./router/adminRoutes");
const authRoutes = require("./router/authUserRoutes");
const categoryRoutes = require("./router/categoryRoutes");
const subCategoryRoutes = require("./router/subCategoryRoutes");
const productMasterRoutes = require("./router/productMasterRoutes");
const retailerProductRoutes = require("./router/retailerProductRoutes");
const adminRetailerProductRoutes = require("./router/adminRetailerProductRoutes");

/* ========================
   BASE ROUTE
======================== */
app.get("/", (req, res) => {
  res.json({ name: "Local Kirana API" });
});

/* ========================
   MOUNT ROUTES
======================== */
app.use("/product", productRoutes);
app.use("/aboutus", aboutRoutes);
app.use("/features", featureRoutes);
app.use("/contactus", contactRoutes);
app.use("/retailer", retailerRoutes);
app.use("/customer", customerRoutes);
app.use("/auth", authRoutes);

app.use("/category", categoryRoutes);
app.use("/subcategories", subCategoryRoutes);

app.use("/admin", adminAuthRoutes);
app.use("/product-master", productMasterRoutes);

app.use("/retailer-products", retailerProductRoutes);
app.use("/admin/retailer-products", adminRetailerProductRoutes);

/* ========================
   404 HANDLER
======================== */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* ========================
   GLOBAL ERROR HANDLER
======================== */
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

/* ========================
   START SERVER
======================== */
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
