const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require("../controllers/authController");

router.get('/', authController.authAdminPrivileges, reviewController.getReviews)
router.get('/product/:product_id', authController.authClientPrivileges, reviewController.getProductReviews)
router.post('/', authController.authAdminPrivileges, reviewController.createReview)
router.put('/:id', authController.authClientPrivileges, reviewController.updateReview)
router.delete('/:id', authController.authClientPrivileges, reviewController.deleteReview)

export = { router };
