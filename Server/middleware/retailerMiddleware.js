const jwt = require("jsonwebtoken");
const Retailer = require("../models/Retailer");

exports.retailerProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Must be retailer
    if (decoded.type !== "retailer") {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    const retailer = await Retailer.findById(decoded.id).select("-password");

    if (!retailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found"
      });
    }

    // ✅ VERY IMPORTANT
    req.user = retailer;        // 👈 controller uses this
    req.retailer = retailer;    // optional

    next();

  } catch (err) {
    console.error("RETAILER AUTH ERROR:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
