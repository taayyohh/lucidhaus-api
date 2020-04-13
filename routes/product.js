const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')
const {listSearch} = require('../controllers/product')

const {userById} = require('../controllers/user')
const {
    productById,
    productBySlug,
    create,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo
} = require('../controllers/product')


// router.get('/product/:productId', read)
router.get('/product/:slug', read)
router.post(
    '/product/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create)
router.delete('/product/:productId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/product/:productId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/products', list)
router.get('/products/search', listSearch)
router.get('/products/related/:slug', listRelated)
router.get('/products/categories', listCategories)
router.post('/products/by/search', listBySearch)
router.get('/product/photo/:productId', photo)
router.get('/shop/photo/:productId', photo)


router.param('userId', userById)
router.param('productId', productById)
router.param('slug', productBySlug)

module.exports = router