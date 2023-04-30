const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: [String],
  isAvailable: {
    type: Boolean,
    default: true,
  },
  // Add more fields here if needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;