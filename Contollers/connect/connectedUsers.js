const Connection = require("../../Models/Connection");


const connectedUsers = async (req,res) => {
    try{
        const requests = await Connection.find({
            "$and" : [
                        {status :  "accepted"},
                        {"$or"  : [{targetUserId : req.userId},{sourceUserId : req.userId}]}
                     ]
        })
        .populate('sourceUserId','name email');
        return res.status(200).json({result : true, message : requests});
    }
    catch(err){
        return res.status(400).json({result : false, message : err.message});
    }
}

module.exports = connectedUsers;