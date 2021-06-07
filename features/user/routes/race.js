const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    raceById,
    raceBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/race')


router.get('/race', list)
router.get('/race/:slug', read)
router.post(
    '/race/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/race/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/race/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('raceId', raceById)
router.param('slug', raceBySlug)

module.exports = router
