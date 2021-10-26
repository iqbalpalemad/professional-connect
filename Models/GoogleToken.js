const mongoose = require('mongoose');

const googleTokenSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    token : {
        type : Object,
    },
    authenticated : {
        type : Boolean,
        default : false
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('GoogleToken', googleTokenSchema);