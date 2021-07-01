const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')
const {userById} = require('../../user/controllers')
const {
    adaptiveEquipmentById,
    adaptiveEquipmentBySlug,
    create,
    read,
    remove,
    update,
    list,
} = require('../controllers/adaptiveEquipment')


router.get('/adaptive-equipment', list)
router.get('/adaptive-equipment/:slug', read)
router.get('/adaptive-equipment/by/id/:id', read)

router.post(
    '/adaptive-equipment/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)
router.delete('/adaptive-equipment/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/adaptive-equipment/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    update
)

router.param('userId', userById)
router.param('id', adaptiveEquipmentById)
router.param('slug', adaptiveEquipmentBySlug)

module.exports = router
