const jwt = require("jsonwebtoken");
const Retailer = require("../models/Retailer");

exports.retailerProtect = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== "retailer") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = await Retailer.findById(decoded.id);
    next();
    
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
