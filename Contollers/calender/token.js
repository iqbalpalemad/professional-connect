const { validationResult }          = require('express-validator')
const GoogleToken                   = require('../../Models/GoogleToken')
const fs                            = require('fs');
const readline                      = require('readline');
const {google}                      = require('googleapis');

const saveToken = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }

    try{
        const code = req.body.code;
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            const credentials = JSON.parse(content);
            const {client_secret, client_id, redirect_uris} = credentials.web;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);
            oAuth2Client.getToken(code, async (err, token) => {
                if (err){
                    return res.status(400).json({result : true,message : err.response.data.error})
                }
                const saveToken = await GoogleToken.findOneAndUpdate({userId:req.userId},
                                                    {token:token,authenticated : true},
                                                    {upsert : true}
                                                )
                return res.status(200).json({result : true,message : "new google access code created"})
            });
        });
    }
    catch(err){
        return res.status(400).json({result : false, message : err.message});
    }

}

module.exports = saveToken;