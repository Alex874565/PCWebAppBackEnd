const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/google', authController.authGoogle);
router.post('/mail', authController.mailCode)
router.post('/check_email', authController.checkEmail)

export = { router };
