import { Schema } from "mongoose";

const mongoose = require('mongoose');
const UserModel = require('./userModel');
const ProductModel = require('./productModel')

const orderSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order_date: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

export = { Order }