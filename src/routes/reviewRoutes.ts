const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require("../controllers/authController");

router.get('/', reviewController.getReviews)
router.get('/product/:product_id', reviewController.getProductReviews)
router.post('/', authController.authClientPrivileges, reviewController.createReview)
router.put('/:id', authController.authClientPrivileges, reviewController.updateReview)
router.delete('/:id', authController.authClientPrivileges, reviewController.deleteReview)

export = { router };
