const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')


const {userById, userBySlug, read, remove, update, purchaseHistory, list} = require('../controllers')


router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})
router.get('/users', list)
router.get('/user/:slug/:userId', requireSignIn, isAuth, read)
// router.get('/user/:userId', requireSignIn, isAuth, read)
router.delete('/user/:slug/:userId', requireSignIn, isAuth, isAdmin, remove)
router.put('/user/:slug/:userId', requireSignIn, isAuth, update)
router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory)


router.param('userId', userById)
router.param('slug', userBySlug)

module.exports = router
