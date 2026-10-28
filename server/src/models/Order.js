const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: String,
  category: String,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, default: "" },
      paymentMethod: { type: String, default: "cod" },
      notes: { type: String, default: "" },
    },
    items: [orderItemSchema],
    orderType: {
      type: String,
      enum: ["delivery", "takeaway", "dinein"],
      default: "delivery",
    },
    subtotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["preparing", "dispatched", "delivered", "cancelled"],
      default: "preparing",
    },
    rider: {
      name: { type: String, default: "Muhammad Hamza" },
      phone: { type: String, default: "+92 312 9876543" },
      bike: { type: String, default: "Honda CD 70 (Reg: KHI-8291)" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
