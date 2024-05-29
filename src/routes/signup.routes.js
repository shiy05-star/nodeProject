const express = require("express");
const router = express.Router();
const signupController = require('../controller/signup.controller');
const { body } = require('express-validator');

//validation
const validateSignupId = [
    body('signupId').isInt({min: 1}).withMessage('user id must be INTEGER')
];


router.get('/signup', signupController.findOne);
router.get('/signupAll', signupController.findAll);

router.post('/create', signupController.createAll);

router.put('/update',signupController.updateAll);

router.delete('/delete',signupController.deleteAll );




module.exports = router;
