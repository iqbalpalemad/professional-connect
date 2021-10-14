const Message = require('../../Models/Message')

const messageList = async (req,res) => {
    const endUserId = req.params.userId;
    try{
        const messages = await Message.find({"$or"  : [
                                {"$and" : [{fromUser : req.userId},{toUser : endUserId}]},
                                {"$and" : [{fromUser : endUserId},{toUser : req.userId}]}
                            ]})
        return res.status(200).json({result : true, message : messages});
    }
    catch(err){
        return res.status(400).json({result : false, message : err.message});
    }
}

module.exports = messageList;