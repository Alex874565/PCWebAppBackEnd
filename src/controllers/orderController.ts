const OrderModel = require('../models/orderModel');
import { Request, Response } from 'express';
const mongoose = require('mongoose');

async function getOrders (req : Request, res : Response){
  try {
    const orders = await OrderModel.Order.find(req.query);
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

async function getClientOrders(req : Request, res : Response){
    try {
      const orders = await OrderModel.Order.find({client_id: req.params.client_id});
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

async function createOrder (req : Request, res : Response){
    const {user_id, value, products, order_date } = req.body
    const order = new OrderModel.Order({
    user_id: user_id,
    value: value,
    products: products,
    order_date: order_date,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

async function updateOrder(req : Request, res : Response){
    try{
        const newOrder = await OrderModel.Order.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body, { new : true });
        res.status(200).json(newOrder);
    } catch (err : any){
        res.status(400).json({message: err.message});
    }
    res.status(200)
}

async function deleteOrder(req : Request, res : Response){
    try{
        const resp = await OrderModel.Order.findById(new mongoose.Types.ObjectId(req.params.id)).remove();
        res.status(200).json(resp);
    }catch(err : any){
        res.status(400).json({message : err.message});
    }
}

export = { getOrders, createOrder, updateOrder, deleteOrder, getClientOrders }