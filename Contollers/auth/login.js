const jwt                           = require('jsonwebtoken');
const bcrypt                        = require('bcrypt');
const User                          = require('../../Models/User')
const { validationResult }          = require('express-validator')

const login = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }

    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({result : false, message : "email address not found"});
    }
    const passwordMatch = await bcrypt.compare(req.body.password,user.password);
    if(!passwordMatch){
        return res.status(400).json({result : false, message : "Password doesn't match"});
    }
    
    if(!user.emailVerified){
       return  res.status(400).json({result : false, message : "email address is not verified"});
    }

    const jwtSecret = process.env.JWT_SECRET;
    const jwtToken  = jwt.sign({id:user._id},jwtSecret,{expiresIn:'1d'})
    return res.json({result : true, message : "Logged in successfully",token : jwtToken});
}

module.exports = login;