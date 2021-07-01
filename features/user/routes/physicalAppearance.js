const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    physicalAppearanceById,
    physicalAppearanceBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/physicalAppearance')


router.get('/physical-appearance', list)
router.get('/physical-appearance/:slug', read)
router.get('/physical-appearance/by/id/:id', read)

router.post(
    '/physical-appearance/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/physical-appearance/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/physical-appearance/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('id', physicalAppearanceById)
router.param('slug', physicalAppearanceBySlug)

module.exports = router
