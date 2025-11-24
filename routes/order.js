const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const asyncHandler = require('express-async-handler');

// Get all orders
router.get('/', asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('userId').sort({ orderDate: -1 });
    res.json({ success: true, message: 'Orders retrieved successfully', data: orders });
}));

// Get order details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('userId');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, message: 'Order retrieved successfully', data: order });
}));

// Create a new order
router.post('/', asyncHandler(async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, message: 'Order created successfully', data: order });
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!updatedOrder) return res.status(404).json({ success: false, message: 'Order not found' });

  res.json({ success: true, message: 'Order updated successfully', data: updatedOrder });
}));



// Delete an order
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, message: 'Order deleted successfully', data: deletedOrder });
}));
// Get all orders for a specific user
router.get('/user/:userId', asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json({
    success: true,
    message: 'Orders for user retrieved successfully',
    data: orders
  });
}));

module.exports = router;
