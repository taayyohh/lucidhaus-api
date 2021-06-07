const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    sexualOrientationById,
    sexualOrientationBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/sexualOrientation')


router.get('/sexual-orientation', list)
router.get('/sexual-orientation/:slug', read)
router.post(
    '/sexual-orientation/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/sexual-orientation/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/sexual-orientation/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('sexualOrientationId', sexualOrientationById)
router.param('slug', sexualOrientationBySlug)

module.exports = router
