const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')

const {userById} = require('../../user/controllers')
const {
    artistById,
    artistBySlug,
    create,
    read,
    remove,
    update,
    getArtistsCatalogue,
    list,
    photo
} = require('../controllers')


// router.get('/admin/:artistId', read)
router.get('/artist/:slug', getArtistsCatalogue, read)
router.post(
    '/artist/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/artist/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/artist/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/artists', list)

router.param('userId', userById)
router.param('artistId', artistById)
router.param('slug', artistBySlug)

module.exports = router
