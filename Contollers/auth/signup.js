const bcrypt                    = require('bcrypt');
const User                      = require('../../Models/User')
const { validationResult }      = require('express-validator')


const signup = async (req,res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }

    try{
        const passwordHash = await bcrypt.hash(req.body.password,12);
        const user = new User({
            email : req.body.email,
            password : passwordHash
        });

        const save = await user.save();
        res.status(201).json({result : true,message : "User created successfully", _id : save._id});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }


 
}

module.exports = signup;