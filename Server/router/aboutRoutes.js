const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: "About Local Kirana",
    description: "We are your local digital Kirana store, connecting you with nearby retailers to make shopping easy, fast, and affordable.",
    mission: "Empowering local retailers through technology and ensuring fresh, quality products reach every home.",
    founded: "2025",
    founder: "Sudhanshu Kumar",
    slogan: "Apka Apna Store, Digital Roop Mein!"
  });
});

module.exports = router;
