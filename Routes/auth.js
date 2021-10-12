const express           = require('express');
const router            = express.Router();

const signup            = require('../Contollers/auth/signup');
const verifyEmail       = require('../Contollers/auth/verifyEmail');
const login             = require('../Contollers/auth/login');
const forgotPassword    = require('../Contollers/auth/forgotPassword')
const resetPassword     = require('../Contollers/auth/resetPassword')
const validate          = require('../Validation/auth');

router.post('/signup',validate.authValidate(),signup);
router.get('/verify/:uuid',verifyEmail)
router.post('/login',validate.authValidate(),login);
router.post('/forgotpassword',validate.forgotPasswordValidate(),forgotPassword);
router.post('/resetpassword/:uuid',validate.resetPassword(),resetPassword);

module.exports = router;