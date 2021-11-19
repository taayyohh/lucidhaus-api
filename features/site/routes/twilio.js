const express = require('express')
const router = express.Router()

const {userById} = require('../../user/controllers')
const {sendVerification, sendEmailVerification, confirmVerification, confirmEmailVerification} = require('../controllers/twilio')

router.post('/twilio/sendVerification', sendVerification)
router.post('/twilio/sendEmailVerification', sendEmailVerification)
router.post('/twilio/confirmVerification', confirmVerification)
router.post('/twilio/confirmEmailVerification', confirmEmailVerification)

router.param('userId', userById)

module.exports = router
