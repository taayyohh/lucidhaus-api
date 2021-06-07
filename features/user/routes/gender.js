const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    genderById,
    genderBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/gender')


router.get('/gender', list)
router.get('/gender/:slug', read)
router.post(
    '/gender/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/gender/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/gender/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('genderId', genderById)
router.param('slug', genderBySlug)

module.exports = router
