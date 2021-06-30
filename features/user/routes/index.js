const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {
    userById,
    userBySlug,
    read,
    remove,
    update,
    purchaseHistory,
    list,
    addBookmark,
    reviewHistory,
} = require('../controllers')

const {recover, reset, resetPassword} = require('../controllers/password')


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
router.put('/bookmark/place/:userId', requireSignIn, isAuth, addBookmark)
router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory)
router.get('/reviews/by/user/:userId', requireSignIn, isAuth, reviewHistory)

//Password RESET
router.post('/auth/recover', recover);
router.get('/auth/reset/:token', reset);
router.post('/auth/reset/:token', resetPassword);


router.param('userId', userById)
router.param('slug', userBySlug)

module.exports = router
