const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {userById} = require('../controllers/user')
const {
    postById,
    postBySlug,
    create,
    read,
    remove,
    update,
    list,
    photo
} = require('../controllers/post')


// router.get('/admin/:postId', read)
router.get('/post/:slug', read)
router.post(
    '/post/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/post/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/post/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/posts', list)

router.param('userId', userById)
router.param('postId', postById)
router.param('slug', postBySlug)

module.exports = router