const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const verifyJWT = (req, res, next) => {
    const token = req.get('Authorization').split('Bearer ')[1]; // Extract the token part of the header
    //console.log(token);
    if (!token) return res.status(403).send('A token is required for authentication');

    try {
       const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        //console.log('Decoded JWT Payload:', req.user);
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid Token', error: error.message });
        
    }
    //return next();
};

module.exports = { verifyJWT };
