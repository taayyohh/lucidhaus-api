const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    foodOptionsById,
    foodOptionsBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/foodOptions')


router.get('/food-options', list)
router.get('/food-options/:slug', read)
router.get('/food-options/by/id/:id', read)

router.post(
    '/food-options/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/food-options/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/food-options/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('id', foodOptionsById)
router.param('slug', foodOptionsBySlug)

module.exports = router
