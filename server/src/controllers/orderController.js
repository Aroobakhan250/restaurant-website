const Order = require("../models/Order");

// @desc    Create new food order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      orderId,
      customer,
      items,
      orderType,
      subtotal,
      discountAmount,
      deliveryFee,
      total,
      rider,
    } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ success: false, message: "Customer name and phone are required" });
    }

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: "Order must contain at least one item" });
    }

    const generatedOrderId = orderId || "ZAF-" + Math.floor(100000 + Math.random() * 900000);

    const order = await Order.create({
      orderId: generatedOrderId,
      customer,
      items,
      orderType: orderType || "delivery",
      subtotal: subtotal || 0,
      discountAmount: discountAmount || 0,
      deliveryFee: deliveryFee || 0,
      total: total || 0,
      status: "preparing",
      rider: rider || {
        name: "Muhammad Hamza",
        phone: "+92 312 9876543",
        bike: "Honda CD 70 (Reg: KHI-8291)",
      },
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
