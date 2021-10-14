const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fromUser : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    toUser : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    body : {
        type : String,
        required : true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Message',messageSchema);