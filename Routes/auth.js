const express           = require('express');
const router            = express.Router();

const signup            = require('../Contollers/auth/signup');
const verifyEmail       = require('../Contollers/auth/verifyEmail');
const login             = require('../Contollers/auth/login');
const forgotPassword    = require('../Contollers/auth/forgotPassword')
const resetPassword     = require('../Contollers/auth/resetPassword')
const generate2fa       = require('../Contollers/auth/generate2fa');
const verify2fa         = require('../Contollers/auth/verify2fa');
const validate          = require('../Validation/auth');
const userAuth          = require('../Middleware/userAuth')

router.post('/signup',validate.authValidate(),signup);
router.get('/verify/:uuid',verifyEmail)
router.post('/login',validate.authValidate(),login);
router.post('/forgotpassword',validate.forgotPasswordValidate(),forgotPassword);
router.post('/resetpassword/:uuid',validate.resetPassword(),resetPassword);
router.post('/generate2fa',userAuth,generate2fa);
router.post('/verify2fa',userAuth,verify2fa);

module.exports = router;