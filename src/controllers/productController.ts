const ProductModel = require('../models/productModel');
import { Request, Response } from 'express';
const mongoose = require('mongoose');

async function getProducts (req : Request, res : Response){
  try {
    const products = await ProductModel.Product.find(req.query);
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

async function getProductsByKeyword (req : Request, res : Response){
  try {
    const keyword = req.params.keyword
    const regex = new RegExp(keyword, 'i')
    const products = await ProductModel.Product.find({name: {$regex: regex}}, '-_id');
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

async function createProduct (req : Request, res : Response){
  const {name, description, launch_date, genre, producer, price, stock} = req.body
  const product = new ProductModel.Product({
    name, description, launch_date, genre, producer, price, stock
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
        const newProduct = await ProductModel.Product.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body, { new : true });
        res.status(200).json(newProduct);
    } catch (err : any){
        res.status(400).json({message: err.message});
    }
    res.status(200)
}

async function deleteProduct(req : Request, res : Response){
    try{
        const resp = await ProductModel.Product.findById(new mongoose.Types.ObjectId(req.params.id)).remove();
        res.status(200).json(resp);
    }catch(err : any){
        res.status(400).json({message : err.message});
    }
}

export = { getProducts, createProduct, updateProduct, deleteProduct, getProductsByKeyword }