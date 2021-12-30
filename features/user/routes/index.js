const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {
    getOneUser,
    list,
    purchaseHistory,
    read,
    remove,
    userById,
    userBySlug,
    update

} = require('../controllers')

const {recover, reset, resetPassword} = require('../controllers/password')


router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})
router.get('/users', list)
router.get('/user/:slug/:userId', requireSignIn, isAuth, read)
router.get('/user/by/id/:aUsersId/:userId', requireSignIn, isAuth, getOneUser)

// router.get('/user/:userId', requireSignIn, isAuth, read)
router.delete(
    '/user/:slug/:userId',
    requireSignIn,
    isAuth,
    // isAdmin, TODO:: does removing this introduce security vulnerability
    remove
)
router.put('/user/:slug/:userId', requireSignIn, isAuth, update)
router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory)

//Password RESET
router.post('/auth/recover', recover);
router.post('/auth/reset/verify/:token', reset);
router.post('/auth/reset/:token', resetPassword);


router.param('userId', userById)
router.param('slug', userBySlug)


module.exports = router
