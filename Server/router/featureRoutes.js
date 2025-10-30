const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    feature1: "Fast delivery directly from your local Kirana store",
    feature2: "Discounted prices with local trust",
    feature3: "Verified retailers and quality assurance",
    feature4: "Digital platform for traditional shopkeepers"
  });
});

module.exports = router;
