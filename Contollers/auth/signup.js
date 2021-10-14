const bcrypt                    = require('bcrypt');
const { validationResult }      = require('express-validator')
const { v4: uuidv4}             = require('uuid');
const User                      = require('../../Models/User')
const sendEmail                 = require('../../Utils/sendMail');


const signup = async (req,res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }
    const emailTaken = await checkEmailTaken(req.body.email)
    if(emailTaken){
        return res.status(400).json({result : false, errors: "Email address already taken" })
    }

    try{
        const passwordHash = await bcrypt.hash(req.body.password,12);
        const user = new User({
            email : req.body.email,
            name : req.body.name,
            password : passwordHash,
            uuid : uuidv4()
        });

        const saveUser = await user.save();
        const emailBody  = "<html>\
                            <h3><a>Click Here to Activate Your email</a></h3>\
                        </html>"
        await sendEmail('Verify Email <verify@samples.mailgun.org>',saveUser.email,"Verify Email","",emailBody);
        res.status(201).json({result : true,message : "User created successfully", _id : saveUser._id});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

const checkEmailTaken = async (email) => {
    try{
        const user = await User.findOne({email : email});
        if(user){
            return true;
        }
        return false;
    }
    catch(err){
        return true;
    }
    
}

module.exports = signup;