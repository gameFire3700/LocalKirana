const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();

/**
 * requireAdminSecret
 * - Use this to protect "register" endpoint.
 * - Accepts secret via header 'x-admin-secret' OR body.secret.
 */
exports.requireAdminSecret = (req, res, next) => {
  const secretFromHeader = req.headers["x-admin-secret"];
  const secretFromBody = req.body && req.body.secret;
  const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

  if (!ADMIN_SECRET_KEY) {
    // If env not set, disallow to be safe
    return res.status(500).json({ message: "Server misconfiguration: ADMIN_SECRET_KEY not set" });
  }

  const provided = secretFromHeader || secretFromBody;
  if (!provided || provided !== ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: "Forbidden: invalid admin secret" });
  }

  // remove secret from body to avoid storing it accidentally
  if (req.body) delete req.body.secret;
  next();
};

/**
 * adminProtect
 * - Validates Bearer JWT, ensures token type 'admin', admin exists and is_active.
 */
exports.adminProtect = async (req, res, next) => {
  try {
    let token;

    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      token = auth.split(" ")[1];
    } else if (req.cookies && req.cookies.adminToken) {
      token = req.cookies.adminToken;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!decoded || decoded.type !== "admin") {
      return res.status(403).json({ message: "Access denied: not an admin token" });
    }

    const admin = await Admin.findById(decoded.id).select("+password");
    if (!admin || admin.is_deleted || !admin.is_active) {
      return res.status(403).json({ message: "Admin not found or inactive" });
    }

    // attach admin to request (but avoid exposing password)
    admin.password = undefined;
    req.admin = admin;
    next();
  } catch (err) {
    console.error("adminProtect error:", err);
    res.status(500).json({ message: "Server error in auth" });
  }
};

/**
 * authorizeRoles(...roles)
 * - Usage: authorizeRoles("SuperAdmin", "Admin")
 * - Ensures req.admin.role is in allowed list
 */
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) return res.status(500).json({ message: "authorizeRoles must be used after adminProtect" });
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }
    next();
  };
};
