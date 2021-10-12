const speakeasy = require('speakeasy');
const User      = require('../../Models/User')

const verify2fa = async (req,res) => {
    try{
        const user = await User.findById(req.userId);
        const verify = speakeasy.totp.verify({
            secret      : user.twoFactorAuthentication,
            encoding    : 'base32',
            token       : req.body.token,
            window      : 2
        });   
        if(verify){
            return res.json({result : true, message : "2fa successfull"});
        }
        else{
            return res.json({result : false, message : "invalid 2fa token"});
        }

    }
    catch(err){
        return res.status(400).json({result : false, message : err.message});
    }
}

module.exports = verify2fa;