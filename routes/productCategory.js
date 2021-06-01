const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {create, categoryById, read, update, remove, list} = require('../controllers/product/category')
const {productCategoryBySlug} = require('../controllers/product/category')

router.get(
    '/product-categories/:slug',
    read
)
router.post(
    '/product-categories/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.put(
    '/product-categories/:categoryId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)
router.delete(
    '/product-categories/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.get(
    '/product-categories',
    list
)

router.param('categoryId', categoryById)
router.param('userId', userById)
router.param('slug', productCategoryBySlug)

module.exports = router
