const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    languageById,
    languageBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/language')


router.get('/language', list)
router.get('/language/:slug', read)
router.get('/language/by/id/:id', read)

router.post(
    '/language/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/language/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/language/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('id', languageById)
router.param('slug', languageBySlug)

module.exports = router
