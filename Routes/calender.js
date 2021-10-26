const express           = require('express');
const router            = express.Router();
const validate          = require('../Validation/calender');

const storeToken        = require('../Contollers/calender/token');
const userAuth          = require('../Middleware/userAuth');
const getFreeSlots      = require('../Contollers/calender/freeSlot'); 


router.post('/token',userAuth,validate.tokenStoreValidation(),storeToken);
router.get('/freeSlots/:userId',userAuth,validate.getFreeSlotValidation(),getFreeSlots);
module.exports = router;    