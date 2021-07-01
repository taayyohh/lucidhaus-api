const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    communitiesServedById,
    communitiesServedBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/communitiesServed')


router.get('/communities-served', list)
router.get('/communities-served/:slug', read)
router.get('/communities-served/by/id/:id', read)

router.post(
    '/communities-served/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/communities-served/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/communities-served/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('id', communitiesServedById)
router.param('slug', communitiesServedBySlug)

module.exports = router
