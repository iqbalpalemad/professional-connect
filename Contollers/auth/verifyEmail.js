const User                      = require('../../Models/User')

const verifyEmail = async (req,res) => {
    uuid = req.params.uuid;
    try{
        const updateVerified = await User.updateOne({uuid : uuid},{emailVerified:true});
        if(updateVerified.nModified == 0){
            return res.json({result : false, message : "Invalid URL"});
        }
        else{
            return res.json({result : true, message : "Email address verified"});
        }
    }catch(err){
        return res.status(400).json({result : false, message : err.message});
    }
}

module.exports = verifyEmail;