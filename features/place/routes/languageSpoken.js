const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    languageSpokenById,
    languageSpokenBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/languageSpoken')


router.get('/language-spoken', list)
router.get('/language-spoken/:slug', read)
router.post(
    '/language-spoken/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/language-spoken/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/language-spoken/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('languageSpokenId', languageSpokenById)
router.param('slug', languageSpokenBySlug)

module.exports = router
