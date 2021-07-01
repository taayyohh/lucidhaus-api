const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    serviceAnimalById,
    serviceAnimalBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/serviceAnimal')


router.get('/service-animal', list)
router.get('/service-animal/:slug', read)
router.get('/service-animal/by/id/:id', read)

router.post(
    '/service-animal/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/service-animal/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/service-animal/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('id', serviceAnimalById)
router.param('slug', serviceAnimalBySlug)

module.exports = router
