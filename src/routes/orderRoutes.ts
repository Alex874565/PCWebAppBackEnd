const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require("../controllers/authController");

router.get('/',  orderController.getOrders)
router.get('/client/:client_id',  orderController.getClientOrders)
router.post('/',  orderController.createOrder)
router.put('/:id',  orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

export = { router };
