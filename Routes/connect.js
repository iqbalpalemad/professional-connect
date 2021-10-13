const express           = require('express');
const router            = express.Router();
const validate          = require('../Validation/connect');

const listUser          = require('../Contollers/connect/listUsers')
const userAuth          = require('../Middleware/userAuth')

router.get('/listUser',userAuth,validate.listUsersValidation(),listUser)

module.exports = router;
