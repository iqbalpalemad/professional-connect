const express            = require('express');
const router             = express.Router();
const validate           = require('../Validation/connect');

const userAuth           = require('../Middleware/userAuth')
const listUser           = require('../Contollers/connect/listUsers')
const connectionRequest  = require('../Contollers/connect/request')
const connectionList     = require('../Contollers/connect/connectionList');
const connectionResponse = require('../Contollers/connect/connectionResponse');
const connectedUsers     = require('../Contollers/connect/connectedUsers');

router.get('/listUser',userAuth,validate.listUsersValidation(),listUser)
router.post('/connect/:userId',userAuth,connectionRequest)
router.get('/connectionList/:requestType',userAuth,connectionList)
router.post('/response/:connectionId/:response',userAuth,connectionResponse)
router.get('/connectedUsers',userAuth,connectedUsers)
module.exports = router;
