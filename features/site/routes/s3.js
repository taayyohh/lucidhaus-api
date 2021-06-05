const express = require('express')
const router = express.Router()

const {userById} = require('../../user/controllers')
const {getSignedRequest} = require('../controllers/s3')


router.get('/sign-s3/', getSignedRequest)

router.param('userId', userById)

module.exports = router
