const User                      = require('../../Models/User')
const sendEmail                 = require('../../Utils/sendMail');
const { validationResult }      = require('express-validator')

const generateForgotEmail   = async (req,res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({result : false, message : "email address not found"});
    }
    var emailBody = "<html>\
                        <h3>Click below link to Reset Your password</h3><br>\
                        <a href=''>Click here</a>\
                    </html>"
                    //here the href will be like https://domain/auth/passwordReset/:uuid
    var emailSend = await  sendEmail('Password Reset <reset@samples.mailgun.org>',req.body.email,"Password Reset","",emailBody);
    if(emailSend){
        res.json({result : true, message : "Email sent Successfully"});
    }
    else{
        res.status(400).json({result : false, message : "email send failed"});
    }
}

module.exports = generateForgotEmail;