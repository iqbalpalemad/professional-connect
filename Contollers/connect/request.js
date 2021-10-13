const Connection = require("../../Models/Connection");
const mongoose   = require('mongoose');

const connectionRequest = (req,res) => {
    const targetUser = req.params.userId;
    if(!mongoose.isValidObjectId(targetUser)){
        return res.status(400).json({result : false, message : "Invalid user id"});
    }
    try{
        const connection = new Connection({
            sourceUserId : req.userId,
            targetUserId : targetUser,
            status : "requested"
        })
        const saveConnection = connection.save();
        res.status(201).json({result : true,message : "Connection request sent successfully",});
    }
    catch(err){
        return res.status(400).json({result : false, message : err.message});
    }
}

module.exports = connectionRequest;