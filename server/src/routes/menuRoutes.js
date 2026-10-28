const express = require("express");
const router = express.Router();
const { getMenuItems, seedMenuItems } = require("../controllers/menuController");

router.route("/").get(getMenuItems);
router.route("/seed").post(seedMenuItems);

module.exports = router;
