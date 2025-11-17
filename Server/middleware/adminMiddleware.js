const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.adminProtect = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.admin = await Admin.findById(decoded.id);
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
