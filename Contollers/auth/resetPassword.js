const bcrypt                        = require('bcrypt');
const User                          = require('../../Models/User')
const { validationResult }          = require('express-validator')

const resetPassword  = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }
    uuid = req.params.uuid;
    try{
        const passwordHash   = await bcrypt.hash(req.body.password,12);
        const updatePassword = await User.updateOne({uuid : uuid},{password:passwordHash});
        if(updatePassword.nModified == 0){
            return res.json({result : false, message : "Invalid URL"});
        }
        else{
            return res.json({result : true, message : "Password changed successfully"});
        }
    }catch(err){
        return res.status(400).json({result : false, message : err.message});
    }
}

module.exports = resetPassword;