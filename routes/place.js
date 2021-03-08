const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {userById} = require('../controllers/user')
const {
    placeById,
    placeBySlug,
    create,
    read,
    remove,
    update,
    getPlacesCatalogue,
    list,
    photo
} = require('../controllers/place')


// router.get('/admin/:placeId', read)
router.get('/place/:slug', read)
router.post(
    '/place/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/place/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/place/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/places', list)

router.param('userId', userById)
router.param('placeId', placeById)
router.param('slug', placeBySlug)

module.exports = router