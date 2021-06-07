const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    methodOfCommunicationById,
    methodOfCommunicationBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/methodOfCommunication')


router.get('/method-of-communication', list)
router.get('/method-of-communication/:slug', read)
router.post(
    '/method-of-communication/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/method-of-communication/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/method-of-communication/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('methodOfCommunicationId', methodOfCommunicationById)
router.param('slug', methodOfCommunicationBySlug)

module.exports = router
