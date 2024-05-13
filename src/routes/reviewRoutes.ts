const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require("../controllers/authController");

router.get('/', reviewController.getReviews)
router.get('/product/:product_id', reviewController.getProductReviews)
router.post('/', reviewController.createReview)
router.put('/:id', reviewController.updateReview)
router.delete('/:id', reviewController.deleteReview)

export = { router };
