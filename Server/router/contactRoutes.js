const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    email: "support@localkirana.com",
    phone: "+91-9876543210",
    address: "123 Local Street, India",
    message: "You can reach us anytime between 9 AM to 9 PM!"
  });
});

module.exports = router;
