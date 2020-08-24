const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {userById} = require('../controllers/user')
const {
    businessById,
    businessBySlug,
    create,
    read,
    remove,
    update,
    list,
    photo
} = require('../controllers/business')


// router.get('/business/:businessId', read)
router.get('/business/:slug', read)
router.post(
    '/business/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create)
router.delete('/business/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/business/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/businesses', list)
router.get('/business/photo/:businessId', photo)

router.param('userId', userById)
router.param('businessId', businessById)
router.param('slug', businessBySlug)

module.exports = router