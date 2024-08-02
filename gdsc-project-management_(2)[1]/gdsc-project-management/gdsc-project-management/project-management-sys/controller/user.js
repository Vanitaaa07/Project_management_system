const { error } = require('console');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { JWT_SECRET } = require('../config');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


//Regex for validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@lnmiit.ac.in$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


//node-mailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

//'g-recaptcha-response':recaptchaResponse 
exports.signup = async(req,res)=>{
    const { name, email, password, confirmPassword, userType} = req.body;

    
    if(!emailRegex.test(email)){
        return res.status(400).json({error: 'Invalid email'});
    }

    if (!passwordRegex.test(password)){
        return res.status(401).json({error: 'Passwords does not meet strength requirements'});
    }

     
    if( password !== confirmPassword){
        return res.status(400).json({error: 'Passwords do not match'});
    }
    
    try{
    //CAPTCHA verification
    /*const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: recaptchaResponse
        }
      });
      
  
      if (!response.data.success) {
        console.log('CAPTCHA verification failed');
        return res.status(400).json({ error: 'CAPTCHA verification failed' });
      }*/
      
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({error: 'User already exists'});
        }
        
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(password, salt);

        const verificationToken = uuidv4();
        
        user = new User({
            name,
            email,
            password: hashedPassword,
            emailVerified: false,
            emailVerificationToken: verificationToken,
            emailVerificationTokenExpiry: Date.now() + 60 * 60 * 1000,
            userType
        });

        await user.save();
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //sending verification email
        const verifyUrl = `${process.env.CLIENT_URL}/api/verify/${verificationToken}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Verify your email',
            text: `Please click the link to verify your email: ${verifyUrl}\n\nThe link is valid for 1 hour and can only be used once.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Email could not be sent' });
            }
            return res.status(200).json({message: 'Sign-up successful! Check your email for verification link.'});
        });
        //console.log("request recieved",req.body);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error. Please try again later.' });
    }

   
}; 

exports.login = async (req,res)=>{
    const {email, password} = req.body;

    try{
        
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({error :'User not found'});
        }

        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({error :'Invalid credentials'});
        }

        if(!user.emailVerified){
            return res.status(400).json({error :'Email not verified'});
        }

        const token = jwt.sign({ userId: user._id,email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //user.token=token;
        
        res.status(200).json({ token, message: 'Login successful' });
    }catch (error) {
        res.status(500).send('Error logging in');
    }
};
