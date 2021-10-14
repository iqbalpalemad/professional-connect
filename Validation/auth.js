const { body } = require('express-validator');
const User     = require('../Models/User');

exports.signupValidate = () => {
    return [ 
        body('email', 'Invalid email').exists().isEmail(),
        body('password').exists().isLength({ min: 5 }),
        body('name').exists().isLength({ min: 1 }),
       ]
}

exports.loginValidate = () => {
    return [ 
        body('email', 'Invalid email').exists().isEmail(),
        body('password').exists().isLength({ min: 5 }),
       ]
}

exports.forgotPasswordValidate = () => {
    return [
        body('email', 'Invalid email').exists().isEmail()
    ]
}

exports.resetPassword = () => {
    return [ 
        body('password').exists().isLength({ min: 5 }),
       ]
}