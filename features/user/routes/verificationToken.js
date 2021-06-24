const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userSignupValidator} = require('../../../utils/validator')
const {userById} = require('../controllers')
const {
    verificationTokenByHex,
    create,
    remove,
} = require('../controllers/verificationToken')


router.post(
    '/verification-token/create/:userId',
    requireSignIn,
    isAuth,
    create
)
router.delete('/verification-token/:token/:userId',
    requireSignIn,
    isAuth,
    remove
)

router.param('userId', userById)
router.param('token', verificationTokenByHex)

module.exports = router

