const ObjectId = require('mongoose').Types.ObjectId
const Place = require('../models')
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

exports.placeBySlug = (req, res, next, slug) => {
    Place.findOne({slug: slug})
        .exec((err, place) => {
            if (err || !place) {
                return res.status(400).json({
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

            for (let i = 0; i < Object.values(fields).length; i++) {
                const field = Object.keys(fields)[i]
                const value = Object.values(fields)[i]

                if (!!value) {
                    if (value.includes(",") && ObjectId.isValid(value.split(",")[0])) {
                        place[field] = []
                        for (const v of value.split(",")) {
                            place[field].push(v)
                        }
                    } else if (ObjectId.isValid(value)) {
                        place[field] = []
                        place[field].push(value)

                    } else {
                        place[field] = value

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

exports.read = (req, res) => {
    return res.json(req.place)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let place = req.place

            for (let i = 0; i < Object.values(fields).length; i++) {
                const field = Object.keys(fields)[i]
                const value = Object.values(fields)[i]

                if (!!value) {
                    if (value.includes(",") && ObjectId.isValid(value.split(",")[0])) {
                        place[field] = []
                        for (const v of value.split(",")) {
                            place[field].push(v)
                        }
                    } else if (ObjectId.isValid(value)) {
                        place[field] = []
                        place[field].push(value)
                    } else {
                        place[field] = value
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



