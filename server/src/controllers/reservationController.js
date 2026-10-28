const Reservation = require("../models/Reservation");

// @desc    Create new table reservation
// @route   POST /api/reservations
exports.createReservation = async (req, res) => {
  try {
    const {
      bookingId,
      name,
      phone,
      email,
      guests,
      date,
      timeSlot,
      seatingArea,
      occasion,
      specialRequests,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and phone are required" });
    }

    const generatedId = bookingId || "RES-" + Math.floor(1000 + Math.random() * 9000);

    const reservation = await Reservation.create({
      bookingId: generatedId,
      name,
      phone,
      email: email || "",
      guests: Number(guests) || 2,
      date: date || new Date().toISOString().split("T")[0],
      timeSlot: timeSlot || "08:00 PM",
      seatingArea: seatingArea || "Standard",
      occasion: occasion || "casual",
      specialRequests: specialRequests || "",
    });

    res.status(201).json({
      success: true,
      message: "Reservation confirmed successfully!",
      data: reservation,
    });
  } catch (error) {
    console.error("Reservation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reservations
// @route   GET /api/reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
