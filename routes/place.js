const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {userById} = require('../controllers/user')
const {
    placeById,
    placeBySlug,
    create,
    createFromBoone,
    read,
    remove,
    update,
    list,
} = require('../controllers/place')


// router.get('/admin/:placeId', read)
router.get('/places', list)
router.get('/place/:placeId', read)
router.post(
    '/place/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.post(
    '/place/create-from-boone/:userId',
    requireSignIn,
    isAuth,
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





router.param('userId', userById)
router.param('placeId', placeById)
router.param('slug', placeBySlug)

module.exports = router