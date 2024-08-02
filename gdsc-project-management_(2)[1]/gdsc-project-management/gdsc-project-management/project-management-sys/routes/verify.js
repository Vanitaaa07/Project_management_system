const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
require('dotenv').config();

router.get('/:token', async (req, res) => {
  const { token } = req.params;
  

  try {
    let user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification link' });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined; 
    await user.save();
    console.log(user.emailVerified);

    const authToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.redirect(`${process.env.CLIENT_URL}/api/auth/login?verified=true`);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error. Please try again later.' });
  }
});



module.exports = router;
