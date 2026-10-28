const mongoose = require("mongoose");
require("dotenv").config();
const MenuItem = require("./models/MenuItem");
const menuData = require("./data/menuData.json");

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodies_restaurant";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    await MenuItem.deleteMany({});
    console.log("Cleared existing menu items.");

    await MenuItem.insertMany(menuData);
    console.log(`✅ Successfully seeded ${menuData.length} menu items into MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
