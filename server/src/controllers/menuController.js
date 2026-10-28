const MenuItem = require("../models/MenuItem");

// @desc    Get all menu items
// @route   GET /api/menu
exports.getMenuItems = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ];
    }

    const items = await MenuItem.find(query).sort({ id: 1 });
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Bulk seed or insert menu items
// @route   POST /api/menu/seed
exports.seedMenuItems = async (req, res) => {
  try {
    const items = req.body.items;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Provide an array of items" });
    }

    await MenuItem.deleteMany({});
    const created = await MenuItem.insertMany(items);

    res.status(201).json({
      success: true,
      message: `Seeded ${created.length} menu items successfully!`,
      count: created.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
