const express       = require('express');
const router        = express.Router();

const signup        = require('../Contollers/auth/signup');
const verifyEmail   = require('../Contollers/auth/verifyEmail');
const validate      = require('../Validation/auth');

router.post('/signup',validate.signupValidate(),signup);
router.get('/verify/:uuid',verifyEmail)
module.exports = router;