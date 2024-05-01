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
  launch_date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_price: 
  {
    type: Number,
    required: false,
  },
  stock: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

export = { Product }