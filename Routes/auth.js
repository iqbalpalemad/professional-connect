const express   = require('express');
const router    = express.Router();

const signup    = require('../Contollers/auth/signup');
const validate  = require('../Validation/auth');

router.post('/signup',validate.signupValidate(),signup);
module.exports = router;