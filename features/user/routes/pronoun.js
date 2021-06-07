const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    pronounById,
    pronounBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/pronoun')


router.get('/pronoun', list)
router.get('/pronoun/:slug', read)
router.post(
    '/pronoun/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/pronoun/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/pronoun/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('pronounId', pronounById)
router.param('slug', pronounBySlug)

module.exports = router
