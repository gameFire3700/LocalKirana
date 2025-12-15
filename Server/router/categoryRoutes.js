const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// GET all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find({ is_deleted: false });
        res.json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to load categories" });
    }
});

// GET all with route /category/all
router.get("/all", async (req, res) => {
    try {
        const categories = await Category.find({ is_active: true });
        res.json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to load categories" });
    }
});

// CREATE new category
router.post("/create", async (req, res) => {
    try {
        const { category_id, name, description, parent_category, image_url, display_order } = req.body;

        const category = new Category({
            category_id,
            name,
            description,
            parent_category: parent_category || null,
            image_url: image_url || "",
            display_order: display_order || 0,
        });

        await category.save();

        res.status(201).json({ success: true, data: category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to create category", error: err.message });
    }
});

module.exports = router;