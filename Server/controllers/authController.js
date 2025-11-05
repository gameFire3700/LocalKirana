// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../Data/users');
require('dotenv').config();

// ✅ Helper: Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};  

// ✅ Register new user (with password hashing)
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      const error = new Error("Please provide username, email, and password");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      const error = new Error("User already exists"); 
      error.statusCode = 400;
      return next(error);
    }

    

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    // 🎟️ Generate JWT token 
    const token = generateToken(newUser); 

    res.status(201).json({
      message: "✅ Registration successful",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Login user (with hashed password check)
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Please provide email and password");
      error.statusCode = 400;
      return next(error);
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    // 🔐 Compare hashed password with entered one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      message: "✅ Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Login user (with password compare)
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Please provide email and password");
      error.statusCode = 400;
      return next(error);
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    // 🔐 Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    // 🎟️ Generate JWT token
    const token = generateToken(user);

    res.json({
      message: "✅ Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};



// // controllers/authController.js
// const users = require('../Data/users'); // ✅ Correct import

// // ✅ Register new user
// exports.registerUser = (req, res, next) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     const error = new Error("Please provide username, email, and password");
//     error.statusCode = 400;
//     return next(error);
//   }

//   const existingUser = users.find(u => u.email === email);
//   if (existingUser) {
//     const error = new Error("User already exists");
//     error.statusCode = 400;
//     return next(error);
//   }

//   const newUser = {
//     id: users.length + 1,
//     username,
//     email,
//     password
//   };

//   users.push(newUser);

//   res.status(201).json({
//     message: "✅ Registration successful",
//     user: newUser
//   });
// };

// // ✅ Login user
// exports.loginUser = (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     const error = new Error("Please provide email and password");
//     error.statusCode = 400;
//     return next(error);
//   }

//   const user = users.find(u => u.email === email && u.password === password);
//   if (!user) {
//     const error = new Error("Invalid email or password");
//     error.statusCode = 401;
//     return next(error);
//   }

//   res.json({
//     message: "✅ Login successful",
//     user: {
//       id: user.id,
//       username: user.username,
//       email: user.email
//     }
//   });
// };
