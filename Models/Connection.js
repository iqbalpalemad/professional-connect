const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    sourceUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    targetUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    status : {
        type : String,
        required : true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Connection',connectionSchema);