// router/authRoutes.js


const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // ✅ import middleware


router.get('/', (req, res) => {
  res.json({ message: "Auth route working! Use POST /register or /login" });
});

// ✅ Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ Protected route
router.get('/profile', protect, (req, res) => {
  res.json({

    message: "Welcome to your profile!", 
    user: req.user                        

  });
});

module.exports = router;
