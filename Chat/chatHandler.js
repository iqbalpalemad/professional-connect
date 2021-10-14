const Message      = require('../Models/Message');

const incomingMessageHandler = async (req) => {
    try{
        const message = new Message({
            fromUser : req.fromUserId,
            toUser   : req.toUserId,
            body     : req.message
        })
        await message.save();
    }
    catch(err){

    }

}


module.exports.incomingMessageHandler = incomingMessageHandler;
