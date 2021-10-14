const express           = require('express');
const router            = express.Router();

const userAuth           = require('../Middleware/userAuth')
const messageList       = require('../Contollers/message/listMessages');

router.get('/messageList/:userId',userAuth,messageList)

module.exports = router;