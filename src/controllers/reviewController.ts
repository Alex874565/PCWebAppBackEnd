const ReviewModel = require('../models/reviewModel');
import { Request, Response } from 'express';
const mongoose = require('mongoose');

async function getReviews (req : Request, res : Response){
  try {
    const reviews = await ReviewModel.Review.find(req.query);
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

async function getProductReviews(req : Request, res : Response){
    try {
      const reviews = await ReviewModel.Review.find({product_id: req.params.product_id});
      res.json(reviews);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

async function createReview (req : Request, res : Response){
    const {user, product_id, rating, comment, date } = req.body
    const review = new ReviewModel.Review({
    user: user,
    product_id: product_id,
    rating: rating,
    comment: comment,
    date: date
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

async function updateReview(req : Request, res : Response){
    try{
        const newReview = await ReviewModel.Review.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body, { new : true });
        res.status(200).json(newReview);
    } catch (err : any){
        res.status(400).json({message: err.message});
    }
    res.status(200)
}

async function deleteReview(req : Request, res : Response){
    try{
        const resp = await ReviewModel.Review.findById(new mongoose.Types.ObjectId(req.params.id)).remove();
        res.status(200).json(resp);
    }catch(err : any){
        res.status(400).json({message : err.message});
    }
}

export = { getReviews, createReview, updateReview, deleteReview, getProductReviews }