const { body } = require('express-validator');
const User     = require('../Models/User');

exports.signupValidate = () => {
    return [ 
        body('email', 'Invalid email').exists().isEmail(),
        body('password').exists().isLength({ min: 5 }),
       ]
}

