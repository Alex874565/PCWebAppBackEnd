import { Schema } from "mongoose";

const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  product_id: {
    type: Schema.Types.ObjectId,
    reg: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false,
    default: ""
  },
  date: {
    type: String,
    required: true
  }
});

const Review = mongoose.model('Review', reviewSchema);

export = { Review }