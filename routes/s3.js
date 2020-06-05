const express = require('express')
const router = express.Router()

const {requireSignIn, isAuth} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {getSignedRequest} = require('../controllers/s3')


router.get('/sign-s3/', getSignedRequest)
// router.post('/braintree/payment/:userId', requireSignIn, isAuth, processPayment)


router.param('userId', userById)

module.exports = router