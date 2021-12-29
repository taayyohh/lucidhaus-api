const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')

const {
    collaboratorById,
    collaboratorBySlug,
    create,
    read,
    remove,
    update,
    getCollaboratorsCatalogue,
    list,
    photo
} = require('../controllers')


router.get('/collaborator/:slug', read)
router.post(
    '/collaborator/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/collaborator/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/collaborator/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.get('/collaborators', list)

router.param('userId', userById)
router.param('collaboratorId', collaboratorById)
router.param('slug', collaboratorBySlug)

module.exports = router
