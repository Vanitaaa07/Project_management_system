const express = require('express');
const router = express.Router();
const authController = require('../controller/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/signup',authController.signup);
router.post('/login',authController.login);


module.exports = router;
