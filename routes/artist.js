const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {userById} = require('../controllers/user')
const {
    artistById,
    create,
    read,
    remove,
    update,
    list,
    photo
} = require('../controllers/artist')


router.get('/artist/:artistId', read)
router.post(
    '/artist/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create)
router.delete('/artist/:artistId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/artist/:artistId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/artists', list)
router.get('/artist/photo/:artistId', photo)

router.param('userId', userById)
router.param('artistId', artistById)

module.exports = router