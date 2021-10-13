const Connection = require("../../Models/Connection");

const listRequests = async (req,res) => {
    requestType = req.params.requestType;
    if(requestType != "requested" && requestType != "accepted" && requestType != "denied"){
        return res.status(400).json({result : false, message : "Invalid request"});
    }
    try{
        const requests = await Connection.find({targetUserId : req.userId,status :  requestType})
        .populate('sourceUserId','name email');
        return res.status(200).json({result : true, message : requests});
    }
    catch(err){
        return res.status(400).json({result : false, message : err.message});
    }
 }


module.exports = listRequests;