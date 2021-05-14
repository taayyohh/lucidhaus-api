const express = require('express')
const router = express.Router()

const {userById} = require('../controllers/user')
const {sendVerification, confirmVerification} = require('../controllers/twilio')



router.post('/twilio/sendVerification', sendVerification)
router.post('/twilio/confirmVerification', confirmVerification)


router.param('userId', userById)

module.exports = router
