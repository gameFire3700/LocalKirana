const jwt = require("jsonwebtoken");
const Retailer = require("../models/Retailer");

exports.retailerProtect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== "retailer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const retailer = await Retailer.findById(decoded.id).select("-password");
    if (!retailer) return res.status(404).json({ message: "Retailer not found" });

    req.user = retailer;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};
