const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    businessOwnerById,
    businessOwnerBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/businessOwner')


router.get('/business-owner', list)
router.get('/business-owner/:slug', read)
router.post(
    '/business-owner/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/business-owner/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/business-owner/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('businessOwnerId', businessOwnerById)
router.param('slug', businessOwnerBySlug)

module.exports = router
