const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')

const {
    eventById,
    eventBySlug,
    create,
    read,
    remove,
    update,
    getCollaboratorsCatalogue,
    list,
    photo
} = require('../controllers')


router.get('/event/:slug', read)
router.post(
    '/event/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/event/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/event/:slug',
    update
)

router.get('/events', list)

router.param('userId', userById)
router.param('eventId', eventById)
router.param('slug', eventBySlug)

module.exports = router
