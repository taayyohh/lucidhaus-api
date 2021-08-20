const ObjectId = require('mongoose').Types.ObjectId
const Place = require('../models')
const Review = require('../models/review')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.placeById = (req, res, next, id) => {
    const placeId = id.substr(id.lastIndexOf('-') + 1)

    Place.findById(id)
        .exec((err, place) => {
            if (err || !place) {
                return res.status(400).json({
                    status: 410,
                    error: 'place not found'
                })
            }
            req.place = place
            next()
        })
}

exports.reviewById = (req, res, next, id) => {
    Review.findById(id)
        .exec((err, review) => {
            if (err || !review) {
                return res.status(400).json({
                    status: 410,
                    error: 'review not found'
                })
            }
            req.review = review
            next()
        })
}

exports.verificationCodeById = (req, res, next, id) => {
    Review.findById(id)
        .exec((err, review) => {
            if (err || !review) {
                return res.status(400).json({
                    status: 410,
                    error: 'No Reviews'
                })
            }
            req.review = review
            next()
        })
}

exports.placeBySlug = (req, res, next, slug) => {
    Place.findOne({slug: slug})
        .exec((err, place) => {
            if (err || !place) {
                return res.status(400).json({
                    status: 410,
                    error: 'place not found'
                })
            }
            req.place = place
            next()
        })
}

exports.placeByBooneId = (req, res, next, booneId) => {
    Place.findOne({booneId: booneId})
        .exec((err, place) => {
            if (err || !place) {
                return res.status(400).json({
                    error: 'boone place not found'
                })
            }
            req.place = place
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let place = new Place(fields)
            const BOONE_ID = 'booneId'

            Place.findOne({booneId: parseInt(fields.booneId)}).exec((err, existingPlace) => {
                if (!existingPlace) {
                    for (let i = 0; i < Object.values(fields).length; i++) {
                        const field = Object.keys(fields)[i]
                        const value = Object.values(fields)[i]
                        const isBooneId = field === BOONE_ID

                        if (!!value) {

                            if (value.includes(",") && ObjectId.isValid(value.split(",")[0])) {
                                place[field] = []
                                for (const v of value.split(",")) {
                                    place[field].push(v)
                                }
                            }
                                // else if (ObjectId.isValid(value) && !isBooneId && field !== 'longitude' && field !== 'latitude' && field !== 'address1') {
                                //     console.log('field', field)
                                //     place[field] = []
                                //     place[field].push(value)
                            // }
                            else if (value === 'null') {
                                place[field] = null
                            } else if (value === 'undefined') {
                                place[field] = undefined
                            } else {
                                place[field] = isBooneId ? parseInt(value) : value
                            }
                        }
                    }

                    place.save((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        }

                        res.json(result)
                    })

                } else {
                    return res.status(409).json({
                        error: 'already exists'
                    })
                }
            })
        })
}

exports.read = (req, res) => {
    return res.json(req.place)
}

exports.readReview = (req, res) => {
    return res.json(req.review)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let place = req.place

            if (fields.hasOwnProperty('review')) {
                Review.create(fields, function (err, review) {
                    if (err) return errorHandler(err)
                    place.reviews.push(review._id)
                    place.save()
                })

            } else {
                for (let i = 0; i < Object.values(fields).length; i++) {
                    const field = Object.keys(fields)[i]
                    const value = Object.values(fields)[i]

                    if (!!value) {
                        if (value.includes(",") && ObjectId.isValid(value.split(",")[0])) {
                            place[field] = []
                            for (const v of value.split(",")) {
                                place[field].push(v)
                            }
                        } else if (ObjectId.isValid(value) && field !== 'longitude' && field !== 'latitude' && field !== 'address1') {
                            place[field] = []
                            place[field].push(value)
                        } else if (value === 'null') {
                            place[field] = null
                        } else {
                            place[field] = value
                        }
                    }
                }
            }

            place.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                res.json(result)
            })

        })
}

exports.updateReview = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let review = req.review
            review = _.extend(review, fields)

            review.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                res.json(result)
            })
        })
}

exports.remove = (req, res) => {
    let place = req.place
    place.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Place deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Place.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, places) => {
            if (err) {
                return res.status(400).json({
                    message: 'admin not found'
                })
            }

            res.send(places)
        })
}

exports.listPendingPlaces = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Place.find({isPendingSubmission: true})
        .limit(limit)
        .exec((err, places) => {
            if (err) {
                return res.status(400).json({
                    message: 'No Places are pending'
                })
            }

            res.send(places)
        })
}

exports.listFlaggedReviews = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Review.find({isFlagged: true})
        .limit(limit)
        .exec((err, reviews) => {
            if (err) {
                return res.status(400).json({
                    message: 'No Reviews are flagged'
                })
            }

            res.send(reviews)
        })
}


