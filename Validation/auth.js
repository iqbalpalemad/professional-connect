const { body } = require('express-validator');
const User     = require('../Models/User');

exports.signupValidate = () => {
    return [ 
        body('email', 'Invalid email').exists().isEmail().custom( async (email) => {
            const user = await checkEmailTaken(email);
            if(user)
                return Promise.reject("Email address already taken");
            return Promise.resolve();
        }),
        body('password').exists().isLength({ min: 5 }),
       ]
}

const checkEmailTaken = async (email) => {
    const user = await User.findOne({email : email});
    if(user)
        return true;
    return false;
}