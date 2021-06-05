const express = require('express')
const router = express.Router()

const {requireSignIn, isAuth} = require('../../../user/controllers/auth')
const {userById} = require('../../../user/controllers')
const {generateToken, processPayment} = require('../controllers/braintree')


router.get('/braintree/getToken/', generateToken)
router.post('/braintree/payment/', processPayment)

router.param('userId', userById)

module.exports = router
