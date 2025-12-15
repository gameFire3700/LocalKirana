const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();

/**
 * requireAdminSecret
 * - Protects admin registration endpoint.
 * - Accepts secret via header 'x-admin-secret' OR body.secret.
 */
exports.requireAdminSecret = (req, res, next) => {
  const secretFromHeader = req.headers["x-admin-secret"];
  const secretFromBody = req.body?.secret;
  const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

  if (!ADMIN_SECRET_KEY) {
    return res.status(500).json({ message: "Server misconfiguration: ADMIN_SECRET_KEY not set" });
  }

  const provided = secretFromHeader || secretFromBody;
  if (!provided || provided !== ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: "Forbidden: invalid admin secret" });
  }

  if (req.body) delete req.body.secret;
  next();
};

/**
 * adminProtect
 * - Validates JWT token.
 * - Ensures token type is 'admin'.
 * - Ensures admin exists, is_active and not deleted.
 */
exports.adminProtect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.adminToken) {
      token = req.cookies.adminToken;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Check token type
    if (!decoded || decoded.type !== "admin") {
      return res.status(403).json({ message: "Access denied: not an admin token" });
    }

    // Fetch admin from DB
    const admin = await Admin.findById(decoded.id).select("+password");
    if (!admin) {
      return res.status(403).json({ message: "Admin not found" });
    }

    if (!admin.is_active || admin.is_deleted) {
      return res.status(403).json({ message: "Admin inactive or deleted" });
    }

    // Attach admin to request
    req.admin = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      is_active: admin.is_active,
    };

    next();
  } catch (err) {
    console.error("adminProtect error:", err);
    return res.status(500).json({ message: "Server error in admin authentication" });
  }
};

/**
 * authorizeRoles(...roles)
 * - Ensures req.admin.role is included in allowed roles
 */
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(500).json({ message: "authorizeRoles must be used after adminProtect" });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};