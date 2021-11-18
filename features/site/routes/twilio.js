const express = require('express')
const router = express.Router()

const {userById} = require('../../user/controllers')
const {sendVerification, sendEmailVerification, confirmVerification} = require('../controllers/twilio')



router.post('/twilio/sendVerification', sendVerification)
router.post('/twilio/sendEmailVerification', sendEmailVerification)
router.post('/twilio/confirmVerification', confirmVerification)


router.param('userId', userById)

module.exports = router
