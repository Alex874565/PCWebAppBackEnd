const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require("../controllers/authController");

router.get('/', userController.getUsers)
router.post('/', authController.authAdminPrivileges, userController.createUser)
router.put('/:id', authController.authClientPrivileges, userController.updateUser)
router.delete('/', authController.authClientPrivileges, userController.deleteUser)

export = { router };
