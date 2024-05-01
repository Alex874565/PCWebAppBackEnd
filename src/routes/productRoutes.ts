const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');


router.get('/', productController.getProducts)
router.post('/', authController.authDistributorPrivileges, productController.createProduct)
router.put('/:id', authController.authDistributorPrivileges, productController.updateProduct)
router.delete('/:id', authController.authDistributorPrivileges, productController.deleteProduct)

export = { router };
