const multer = require("multer");
const path = require("path");

// Set storage folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // folder name
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter (only images allowed)
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files allowed"), false);
};

module.exports = multer({ storage, fileFilter });
