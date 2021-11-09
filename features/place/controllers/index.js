const Place = require('../models')
const Review = require('../models/review')
const formidable = require('formidable')
const _ = require('lodash')
const {isValidMongooseObjectId} = require('../../../utils/helpers/mongoose')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.placeById = (req, res, next, id) => {
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

            Place.findOne({booneId: parseInt(fields.booneId)}).exec((err, existingPlace) => {
                if (!existingPlace) {
                    for (let i = 0; i < Object.values(fields).length; i++) {
                        const field = Object.keys(fields)[i]
                        const value = Object.values(fields)[i]

                        place.geojson = [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [place.longitude, place.latitude],
                                }
                            }
                        ]
                        place.geojson[0].properties.phoneFormatted = place.tel
                        place.geojson[0].properties.phone = place.tel
                        place.geojson[0].properties.address = place.address1
                        place.geojson[0].properties.addres2 = place.address2
                        place.geojson[0].properties.city = place.city
                        place.geojson[0].properties.country = place.country
                        place.geojson[0].properties.postalCode = place.zip
                        place.geojson[0].properties.state = place.state
                        place.geojson[0].properties.name = place.name
                        place.geojson[0].properties.description = place.description


                        if (isValidMongooseObjectId(value.split(",")[0])) {
                            place[field] = []

                            for (const v of value.split(",")) {
                                place[field].push(v)
                            }
                        } else if (value === 'isEmptyArray') {
                            place[field] = []
                        } else {
                            place[field] = value
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
                        error: existingPlace.slug
                    })
                }
            })
        })
}


exports.submit = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let place = new Place(fields)

            Place.find({}, 'geojson').exec((err, existingPlace) => {
                const placeExists = (existingPlace
                    .filter(item => item.geojson[0]?.properties?.state === fields.state)
                    .filter(item => item.geojson[0]?.properties?.city === fields.city)
                    .filter(item => item.geojson[0]?.properties?.address === fields.address1)).length > 0

                console.log('place', existingPlace.filter(item => item.geojson[0]?.properties?.address === fields.address1))
                console.log('place', placeExists)
                console.log('fields', fields)

                if (err) {
                    return res.status(409).json({
                        error: err
                    })
                }

                if (placeExists) {
                    return res.status(409).json({
                        error: 'already exists'
                    })
                }


                for (let i = 0; i < Object.values(fields).length; i++) {
                    const field = Object.keys(fields)[i]
                    const value = Object.values(fields)[i]

                    place.geojson = [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [place.longitude, place.latitude],
                            }
                        }
                    ]
                    place.geojson[0].properties.phoneFormatted = place.tel
                    place.geojson[0].properties.address = place.address1
                    place.geojson[0].properties.addres2 = place.address2
                    place.geojson[0].properties.city = place.city
                    place.geojson[0].properties.postalCode = place.zip
                    place.geojson[0].properties.state = place.state
                    place.geojson[0].properties.name = place.name
                    place.geojson[0].properties.description = place.description


                    if (isValidMongooseObjectId(value.split(",")[0])) {
                        place[field] = []

                        for (const v of value.split(",")) {
                            place[field].push(v)
                        }
                    } else if (value === 'isEmptyArray') {
                        place[field] = []
                    } else {
                        place[field] = value
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
                let review = new Review
                review = _.extend(review, fields)
                for (let i = 0; i < Object.values(fields).length; i++) {
                    const field = Object.keys(fields)[i]
                    const value = Object.values(fields)[i]

                    if (field === 'celebrated' || field === 'safe' || field === 'welcome') {
                        review[field] = []
                        for (const v of value.split(",")) {
                            review[field].push(v.match(/\d+/g) !== null ? parseInt(v) : v)
                        }
                    }
                }

                place.averageSafe = ((((place.averageSafe > 0 ? place.averageSafe : 0) * (place.reviews.length > 0 ? place.reviews.length : 0)) + review.safe[1]) / (place.reviews.length + 1)).toFixed(2)
                place.averageCelebrated = ((((place.averageCelebrated > 0 ? place.averageCelebrated : 0) * (place.reviews.length > 0 ? place.reviews.length : 0)) + review.celebrated[1]) / (place.reviews.length + 1)).toFixed(2)
                place.averageWelcome = ((((place.averageWelcome > 0 ? place.averageWelcome : 0) * (place.reviews.length > 0 ? place.reviews.length : 0)) + review.welcome[1]) / (place.reviews.length + 1)).toFixed(2)
                place.inclusiveScore = ((place.averageSafe + place.averageCelebrated + place.averageWelcome) / 3).toFixed(2)

                review.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }

                    place.reviews.push(review._id)
                    place.save()

                    res.json(result)
                })

            } else {

                for (let i = 0; i < Object.values(fields).length; i++) {
                    const field = Object.keys(fields)[i]
                    const value = Object.values(fields)[i]

                    place.geojson = [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [place.longitude, place.latitude],
                            }
                        }
                    ]
                    place.geojson[0].properties.phoneFormatted = place.tel
                    place.geojson[0].properties.phone = place.tel
                    place.geojson[0].properties.address = place.address1
                    place.geojson[0].properties.city = place.city
                    place.geojson[0].properties.country = place.country
                    place.geojson[0].properties.postalCode = place.zip
                    place.geojson[0].properties.state = place.state
                    place.geojson[0].properties.name = place.name
                    place.geojson[0].properties.description = place.description

                    if (isValidMongooseObjectId(value.split(",")[0])) {
                        place[field] = []
                        for (const v of value.split(",")) {
                            place[field].push(v)
                        }
                    } else if (value === 'isEmptyArray') {
                        place[field] = []
                    } else {
                        place[field] = value
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
            }

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
    let limit = req.query.limit ? parseInt(req.query.limit) : 100

    Review.find({report: {$exists: true, $not: {$size: 0}}})
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


