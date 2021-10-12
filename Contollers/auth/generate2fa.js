const speakeasy = require('speakeasy');
const qrcode    = require('qrcode');
const User      = require('../../Models/User')


const getTwoFactorAuthenticationCode = async (req,res) => {
    const secretCode = speakeasy.generateSecret({
        name: process.env.APP_NAME,
    });
    console.log(secretCode)
    const update2fa    = await User.updateOne({_id : req.userId},{twoFactorAuthentication : secretCode.base32})
    if(update2fa.nModified == 0){
        res.json({result : false, message : "Error in 2fa"});
    }
    else{
        qrcode.toFileStream(res, secretCode.otpauth_url);
    }
}


module.exports = getTwoFactorAuthenticationCode;