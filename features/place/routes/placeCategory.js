const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    placeCategoryById,
    placeCategoryBySlug,
    create,
    read,
    remove,
    update,
    list,
    placeCategoryByNameOrDescription
} = require('../controllers/placeCategory')


router.get('/place-category', list)
router.get('/place-category/:slug', read)
router.get('/place-category/by/id/:id', read)
router.get('/place-category/by/name/or/description/:searchInput', read)

router.post(
    '/place-category/create/:userId',
    requireSignIn,
    isAuth,
    create
)
router.delete('/place-category/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/place-category/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('id', placeCategoryById)
router.param('slug', placeCategoryBySlug)
router.param('searchInput', placeCategoryByNameOrDescription)

module.exports = router
