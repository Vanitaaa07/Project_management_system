const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // minLength: 8,
        required: true
    },
    emailVerified: { 
        type: Boolean, 
        default: false
    },
    userType: {
        type: String,
        enum: ['Student','Admin'],
        required: true
    },
    emailVerificationToken:{
        type: String,
    },
    emailVerificationTokenExpiry:{
        type: Date,
    }
    
});

module.exports = mongoose.model('User',userSchema);  