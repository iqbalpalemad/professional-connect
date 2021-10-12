const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    uuid : {
        type : String,
        required : true
    },
    emailVerified : {
        type : Boolean ,
        default : false
    },
    twoFactorAuthentication : {
        type : String
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('User',userSchema);