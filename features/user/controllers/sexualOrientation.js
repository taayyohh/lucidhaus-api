const SexualOrientation = require('../models/sexualOrientation')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.sexualOrientationById = (req, res, next, id) => {
    const sexualOrientationId = id.substr(id.lastIndexOf('-') + 1)

    SexualOrientation.findById(id)
        .exec((err, sexualOrientation) => {
            if (err || !sexualOrientation) {
                return res.status(400).json({
                    status: 410,
                    error: 'sexualOrientation not found'
                })
            }
            req.sexualOrientation = sexualOrientation
            next()
        })
}

exports.sexualOrientationBySlug = (req, res, next, slug) => {
    SexualOrientation.findOne({slug: slug})
        .exec((err, sexualOrientation) => {
            if (err || !sexualOrientation) {
                return res.status(400).json({
                    error: 'sexualOrientation not found'
                })
            }
            req.sexualOrientation = sexualOrientation
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let sexualOrientation = new SexualOrientation(fields)

            sexualOrientation.save((err, result) => {
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
    return res.json(req.sexualOrientation)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.sexualOrientation._id
            let sexualOrientation = req.sexualOrientation
            sexualOrientation = _.extend(sexualOrientation, fields)


            sexualOrientation.save((err, result) => {
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
    let sexualOrientation = req.sexualOrientation
    sexualOrientation.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'SexualOrientation deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    SexualOrientation.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, sexualOrientation) => {
            if (err) {
                return res.status(400).json({
                    message: 'sexualOrientation not found'
                })
            }

            res.send(sexualOrientation)
        })
}

