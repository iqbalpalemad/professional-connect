const Connection = require("../../Models/Connection");

const connectionResponse = async (req,res) => {
    const connectionId = req.params.connectionId;
    const response     = req.params.response;
    if(response != "accepted" && response != "denied"){
        return res.status(400).json({result : false, message : "Invalid request"});
    }
    try{

        const updateConnection = await Connection.updateOne({_id : connectionId},{ status : response});
        if(updateConnection.nModified == 0){
            return res.status(500).json({result : false, message : "error occured"});
        }
        else{
            return res.status(200).json({result : true, message : "connection state changed"});
        }
    }
    catch(err){
        return res.status(400).json({result : false, message : err.message});
    }

}

module.exports = connectionResponse;