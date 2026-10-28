const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    desc: { type: String, default: "" },
    image: { type: String, default: "" },
    diet: { type: String, default: "non-veg" },
    spicy: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    prepTime: { type: String, default: "15 min" },
    calories: { type: String, default: "350 kcal" },
    isPopular: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
