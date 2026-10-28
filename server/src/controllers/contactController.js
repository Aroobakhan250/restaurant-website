const Contact = require("../models/Contact");

// @desc    Submit contact message
// @route   POST /api/contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "Name, phone, and message are required" });
    }

    const contact = await Contact.create({
      name,
      email: email || "",
      phone,
      subject: subject || "general",
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message received successfully!",
      data: contact,
    });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
