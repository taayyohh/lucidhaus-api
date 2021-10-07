const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models')
const Place = require('../../place/models')

const Review = require('../../place/models/review')
const formidable = require('formidable')
const _ = require('lodash')
const {Order} = require('../../shop/order/models')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


/*  user + find  */

exports.getOneUser = (req, res) => {
    User.findById(req.params.aUsersId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        res.send(user)
    })
}

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        req.profile = user
        next()
    })
}

exports.userBySlug = (req, res, next, slug) => {
    User.findOne({slug: slug})
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                })
            }

            req.profile = user
            req.user = user
            //TODO: evaluate if we can remove req.user
            next()
        })
}


/*  user + crud  */

exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.user)
}


exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let user = req.user

            //Identify Form
            if (fields.hasOwnProperty('gender')) {
                for (let i = 0; i < Object.values(fields).length; i++) {
                    const field = Object.keys(fields)[i]
                    const value = Object.values(fields)[i]

                    if (!!value) {
                        if (value.includes(",") && ObjectId.isValid(value.split(",")[0])) {
                            user.identity[field] = []
                            for (const v of value.split(",")) {
                                user.identity[field].push(v)
                            }
                        } else if (ObjectId.isValid(value)) {
                            user.identity[field] = []
                            user.identity[field].push(value)
                            //TODO: decide whether using formik is neccesary
                        } else if (value === 'null') {
                            user.identity[field] = null
                        } else {
                            user.identity[field] = value
                        }
                    }
                }

            } else {
                user = _.extend(user, fields)
            }

            user.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                user.hashed_password = undefined
                user.salt = undefined
                res.json(result)
            })
        })
}

exports.remove = (req, res) => {
    let user = req.user
    user.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'User deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 50

    User.find()
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    message: 'users not found'
                })
            }

            res.send(users)
        })
}


/*  user + place  */

exports.addBookmark = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let user = req.profile

            if (user.bookmarks.includes(fields.placeId)) {
                user.bookmarks.pull(fields.placeId)
            } else {
                user.bookmarks.push(fields.placeId)
            }

            user.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                user.hashed_password = undefined
                user.salt = undefined
                res.json(result)
            })
        })
}

exports.addPlaceSubmissionToUserHistory = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let user = req.profile

            user.pendingPlaceSubmissions.push(fields.submissionId)

            user.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                user.hashed_password = undefined
                user.salt = undefined
                res.json(result)
            })
        })
}


/*  user + review  */

exports.listReviewHistory = (req, res) => {
    Review.find({user: req.profile._id})
        .populate('user', '_id name')
        .sort('-updated')
        .exec((err, reviews) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(reviews)
        })
}

exports.removeReview = (req, res) => {
    let review = req.review

    Place.findById(review.place)
        .exec((err, place) => {
            if (err || !place) {
                return res.status(400).json({
                    status: 410,
                    error: 'place not found'
                })
            }

            const reviewCount = place.reviews.length
            place.averageSafe = (((place.averageSafe * reviewCount) - review.safe[1]) / (reviewCount - 1 > 0 ? reviewCount - 1 : 1)).toFixed(2)
            place.averageWelcome = (((place.averageWelcome * reviewCount) - review.welcome[1]) / (reviewCount - 1 > 0 ? reviewCount - 1 : 1)).toFixed(2)
            place.averageCelebrated = (((place.averageCelebrated * reviewCount) - review.celebrated[1]) / (reviewCount - 1 > 0 ? reviewCount - 1 : 1)).toFixed(2)
            place.inclusiveScore = ((place.averageSafe + place.averageCelebrated + place.averageWelcome) / 3).toFixed(2)
            place.reviews = place.reviews.pull(review._id)
            place.save()
        })

    review.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }


        res.json({
            message: 'Review deleted successfully'
        })
    })
}

exports.updateReview = (req, res) => {
    let form = new formidable.IncomingForm()
    let review = req.review

    Place.findById(review.place)
        .exec((err, place) => {
            if (err || !place) {
                return res.status(400).json({
                    status: 410,
                    error: 'place not found'
                })
            }

            const reviewCount = place.reviews.length
            place.averageSafe = (((place.averageSafe * reviewCount) - review.safe[1]) / (reviewCount - 1 > 0 ? reviewCount - 1 : 1)).toFixed(2)
            place.averageWelcome = (((place.averageWelcome * reviewCount) - review.welcome[1]) / (reviewCount - 1 > 0 ? reviewCount - 1 : 1)).toFixed(2)
            place.averageCelebrated = (((place.averageCelebrated * reviewCount) - review.celebrated[1]) / (reviewCount - 1 > 0 ? reviewCount - 1 : 1)).toFixed(2)
            place.inclusiveScore = ((place.averageSafe + place.averageCelebrated + place.averageWelcome) / 3).toFixed(2)


            form.keepExtensions = true,
                form.parse(req, (err, fields, files) => {

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


                    review.save((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        }


                        place.averageSafe = (((place.averageSafe * place.reviews.length) + review.safe[1]) / (place.reviews.length + 1)).toFixed(2)
                        place.averageCelebrated = (((place.averageCelebrated * place.reviews.length) + review.celebrated[1]) / (place.reviews.length + 1)).toFixed(2)
                        place.averageWelcome = (((place.averageWelcome * place.reviews.length) + review.welcome[1]) / (place.reviews.length + 1)).toFixed(2)
                        place.inclusiveScore = ((place.averageSafe + place.averageCelebrated + place.averageWelcome) / 3).toFixed(2)
                        place.save()

                        res.json(result)
                    })
                })
        })
}

exports.addFlaggedReview = (req, res) => {
    let user = req.profile
    let review = req.review


    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            review.report.push({
                flaggedBy: user._id,
                reason: fields.reason
            })


            review.save((err, result) => {
                user.flaggedReviews.push(review._id)
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }
                })

                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                res.json(result)
            })

        })

}


/*  user + shop  */

exports.addOrderToUserHistory = (req, res, next) => {
    let history = []

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            photo: item.photo,
            category: item.category,
            quantity: item.quantity,
            transactionId: req.body.order.transactionId,
            amount: req.body.order.amount
        })
    })

    if (!!req.body.order.user) {
        User.findOneAndUpdate({_id: req.body.order.user}, {$push: {history: history}}, {new: true}, (error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'Could not update User purchase history'
                })
            }
            next()
        })
    } else {
        next()
    }

}

exports.purchaseHistory = (req, res) => {
    Order.find({user: req.profile._id})
        .populate('user', '_id name')
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(orders)
        })
}
