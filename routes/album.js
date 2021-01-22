const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {userById} = require('../controllers/user')
const {
    albumById,
    albumBySlug,
    create,
    read,
    remove,
    update,
    list,
    photo
} = require('../controllers/album')


// router.get('/admin/:albumId', read)
router.get('/album/:slug', read)
router.post(
    '/album/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/album/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/album/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/albums', list)

router.param('userId', userById)
router.param('albumId', albumById)
router.param('slug', albumBySlug)

module.exports = router