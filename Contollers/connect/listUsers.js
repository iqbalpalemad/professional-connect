const User                          = require('../../Models/User')
const { validationResult }          = require('express-validator')

const listUsers = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }

    try{
        const queryParams = {"$and":[{ emailVerified: true}]};
        if(req.body.searchKey && req.body.searchKey !== ""){
            const orQuery = {
                "$or" : [
                    {"email" : {"$regex": req.body.searchKey, "$options": "i" }},
                    {"name"  : {"$regex": req.body.searchKey, "$options": "i" }},
                ]
            }
            queryParams["$and"].push(orQuery)
        }
        let query = User.find(queryParams);

        if(req.body.pageNumber && req.body.entryPerPage){
            const page       = req.body.pageNumber;
            const limit      = req.body.entryPerPage;
            const skipIndex  = (page - 1) * limit;
                  query      = query.sort({ _id: -1 })
                                .limit(limit)
                                .skip(skipIndex)
        }
        const list = await query.exec();
        return res.status(200).json({result : true, message : list});
    }
    catch(err){
        return res.status(500).json({result : false, message : err.message});
    }
}

module.exports = listUsers