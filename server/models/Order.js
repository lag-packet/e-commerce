const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  totalPrice: { type: Number, required: true },
},
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
