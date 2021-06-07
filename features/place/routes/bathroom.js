const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    bathroomById,
    bathroomBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/bathroom')


router.get('/bathroom', list)
router.get('/bathroom/:slug', read)
router.post(
    '/bathroom/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/bathroom/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/bathroom/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('bathroomId', bathroomById)
router.param('slug', bathroomBySlug)

module.exports = router
