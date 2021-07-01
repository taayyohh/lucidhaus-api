const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    bodyModificationById,
    bodyModificationBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/bodyModification')


router.get('/body-modification', list)
router.get('/body-modification/:slug', read)
router.get('/body-modification/by/id/:id', read)

router.post(
    '/body-modification/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/body-modification/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/body-modification/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('id', bodyModificationById)
router.param('slug', bodyModificationBySlug)

module.exports = router
