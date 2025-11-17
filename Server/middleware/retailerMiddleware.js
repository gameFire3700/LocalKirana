const jwt = require("jsonwebtoken");
const Retailer = require("../models/Retailer");

exports.retailerProtect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Must be retailer
    if (decoded.type !== "retailer") {
      return res.status(403).json({ message: "Access denied for non-retailers" });
    }

    req.user = await Retailer.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
