const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../../user/controllers/auth')
const {userById} = require('../../../user/controllers')
const {create, categoryById, read, update, remove, list} = require('../controllers/category')
const {productCategoryBySlug} = require('../controllers/category')

router.get(
    '/product-placeCategory/:slug',
    read
)
router.post(
    '/product-placeCategory/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.put(
    '/product-placeCategory/:categoryId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)
router.delete(
    '/product-placeCategory/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.get(
    '/product-placeCategory',
    list
)

router.param('categoryId', categoryById)
router.param('userId', userById)
router.param('slug', productCategoryBySlug)

module.exports = router
