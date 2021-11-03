const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../../user/controllers/auth')

const {userById} = require('../../user/controllers')
const {
    placeById,
    placeBySlug,
    reviewById,
    create,
    read,
    readReview,
    remove,
    submit,
    update,
    list,
    listPendingPlaces,
    listFlaggedReviews
} = require('../controllers')


// router.get('/admin/:placeId', read)
router.get('/places', list)
router.get('/pending-places', listPendingPlaces)

router.get('/place/:slug', read)
router.get('/place/by/id/:placeId', read)
router.get('/review/by/id/:reviewId', readReview)
router.get('/reviews/flagged', listFlaggedReviews)

router.post(
    '/place/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    create
)

router.post(
    '/place/submit/:userId',
    requireSignIn,
    isAuth,
    submit
)

router.post(
    '/place/create-from-boone/:userId',
    requireSignIn,
    isAuth,
    create
)
router.delete('/place/:slug/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put('/place/:slug/:userId',
    requireSignIn,
    isAuth,
    update
)

router.param('userId', userById)
router.param('placeId', placeById)
router.param('reviewId', reviewById)
router.param('slug', placeBySlug)

module.exports = router
