const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth')

const {userById} = require('../controllers/user')
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
} = require('../controllers/event')


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
