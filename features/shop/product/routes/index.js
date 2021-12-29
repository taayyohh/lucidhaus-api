const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../../user/controllers/auth')
const {listSearch} = require('../controllers')

const {userById} = require('../../../user/controllers')
const {
    productById,
    productBySlug,
    productsByCategory,
    create,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listProductsByCategory,
    listBySearch,
    photo
} = require('../controllers')


// router.get('/product/:productId', read)
router.get('/product/:slug', read)
router.post(
    '/product/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/product/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/product/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/products', list)
router.get('/products/related/:slug', listRelated)
router.get('/products/category', listCategories)
router.get('/products/category/:productCategory', listProductsByCategory)
router.post('/products/by/search', listBySearch)



router.param('userId', userById)
router.param('productId', productById)
router.param('slug', productBySlug)
router.param('productCategory', productsByCategory)

module.exports = router
