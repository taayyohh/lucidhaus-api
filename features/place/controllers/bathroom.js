const Bathroom = require('../models/bathroom')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.bathroomById = (req, res, next, id) => {
    const bathroomId = id.substr(id.lastIndexOf('-') + 1)

    Bathroom.findById(id)
        .exec((err, bathroom) => {
            if (err || !bathroom) {
                return res.status(400).json({
                    status: 410,
                    error: 'bathroom not found'
                })
            }
            req.bathroom = bathroom
            next()
        })
}

exports.bathroomBySlug = (req, res, next, slug) => {
    Bathroom.findOne({slug: slug})
        .exec((err, bathroom) => {
            if (err || !bathroom) {
                return res.status(400).json({
                    error: 'bathroom not found'
                })
            }
            req.bathroom = bathroom
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let bathroom = new Bathroom(fields)

            bathroom.save((err, result) => {
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
    return res.json(req.bathroom)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.bathroom._id
            let bathroom = req.bathroom
            bathroom = _.extend(bathroom, fields)


            bathroom.save((err, result) => {
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
    let bathroom = req.bathroom
    bathroom.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Bathroom deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Bathroom.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, bathroom) => {
            if (err) {
                return res.status(400).json({
                    message: 'bathroom not found'
                })
            }

            res.send(bathroom)
        })
}

