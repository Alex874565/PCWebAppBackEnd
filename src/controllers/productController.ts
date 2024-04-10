const Product = require('../models/productModel');
import { Request, Response } from 'express';
const mongoose = require('mongoose');

async function getProducts (req : Request, res : Response){
  try {
    const products = await Product.Product.find(req.query);
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


async function createProduct (req : Request, res : Response){
  const product = new Product.Product({
    name: req.body.name,
    description: req.body.description,
    launch_date: req.body.launch_date,
    genre: req.body.genre,
    producer: req.body.producer,
    price: req.body.price,
    stock: req.body.stock,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

async function updateProduct(req : Request, res : Response){
    try{
        const newProduct = await Product.Product.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body, { new : true });
        res.status(200).json(newProduct);
    } catch (err : any){
        res.status(400).json({message: err.message});
    }
    res.status(200)
}

async function deleteProduct(req : Request, res : Response){
    try{
        const resp = await Product.Product.findById(new mongoose.Types.ObjectId(req.body.id)).remove();
        res.status(200).json(resp);
    }catch(err : any){
        res.status(400).json({message : err.message});
    }
}

export = { getProducts, createProduct, updateProduct, deleteProduct }