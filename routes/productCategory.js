const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {create, categoryById, read, update, remove, list} = require('../controllers/productCategory')

router.get(
    '/product-category/:categoryId',
    read
)
router.post(
    '/product-category/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.put(
    '/product-category/:categoryId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)
router.delete(
    '/product-category/:categoryId/:userId',
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

module.exports = router