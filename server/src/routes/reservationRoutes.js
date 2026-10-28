const express = require("express");
const router = express.Router();
const {
  createReservation,
  getReservations,
} = require("../controllers/reservationController");

router.route("/").post(createReservation).get(getReservations);

module.exports = router;
